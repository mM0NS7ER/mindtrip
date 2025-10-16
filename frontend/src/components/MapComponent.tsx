import React, { useEffect, useRef, useState } from 'react';
import { AmapLoader } from '../utils/amapLoader';
import { LocationUtils } from '../utils/locationUtils';

export default function MapComponent() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null); // 用于存储地图实例
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const amapLoader = AmapLoader.getInstance();

  // 获取用户位置
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const location = await LocationUtils.getCurrentPosition();
        setUserLocation(location);
        // 显示成功获取位置的提示
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "获取位置失败";
        setLocationError(errorMsg);
        // 如果获取位置失败，使用默认位置（北京天安门）
        setUserLocation([116.397428, 39.90923]);
      }
    };

    fetchUserLocation();
  }, []);

  // 加载地图
  useEffect(() => {
    const loadMap = async () => {
      try {
        // 加载高德地图API
        await amapLoader.load();
        setMapLoaded(true);

        // 创建地图实例
        if (mapContainerRef.current && !mapRef.current) {
          // 使用用户位置或默认位置作为中心点
          const center = userLocation;

          const map = new (window as any).AMap.Map(mapContainerRef.current, {
            viewMode: '2D', // 使用2D模式
            zoom: 14, // 缩放级别
            center: center, // 中心点坐标
            mapStyle: 'amap://styles/normal', // 使用默认样式
            resizeEnable: true // 允许地图尺寸变化
          });

          // 存储地图实例
          mapRef.current = map;

          // 如果获取到了用户位置，添加用户位置标记
          if (userLocation) {
            const marker = new (window as any).AMap.Marker({
              position: userLocation,
              title: '您的位置',
              map: map,
              animation: 'AMAP_ANIMATION_DROP'
            });

            // 添加信息窗口
            const infoWindow = new (window as any).AMap.InfoWindow({
              content: `<div>您的当前位置</div>`,
              offset: new (window as any).AMap.Pixel(0, -30)
            });

            marker.on('click', () => {
              infoWindow.open(map, userLocation);
            });
          }

          // 创建交通图层
          const traffic = new (window as any).AMap.TileLayer.Traffic({
            zIndex: 10,
            autoRefresh: true
          });
          // 将交通图层添加到地图
          map.add(traffic);
        }
      } catch (error) {
        console.error('Failed to load map:', error);
      }
    };

    loadMap();

    // 清理函数
    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, [amapLoader, userLocation]);

  return (
    <section className="flex-1 relative">
      {locationError && (
        <div className="absolute top-4 left-4 z-10 bg-white p-3 rounded-lg shadow-md text-red-600 max-w-xs">
          <div className="font-bold">位置信息</div>
          <div className="text-sm">{locationError}</div>
        </div>
      )}
      <div
        id="mapContainer"
        ref={mapContainerRef}
        className="w-full h-full border-0"
        style={{ height: '100%' }}
      ></div>
    </section>
  );
}