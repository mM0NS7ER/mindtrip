import React, { useEffect, useRef, useState } from 'react';
import { AmapLoader } from '../utils/amapLoader';
import { LocationUtils } from '../utils/locationUtils';

export default function MapComponent() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null); // 用于存储地图实例
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);


  // 获取用户位置
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const location = await LocationUtils.getCurrentPosition();
        console.log('用户位置:', location);
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
    let isMounted = true;

    const loadMap = async () => {
      try {
        // 直接从单例加载高德地图API
        await AmapLoader.getInstance().load();
        if (!isMounted) return;
        setMapLoaded(true);

        // 创建地图实例（只创建一次）
        if (mapContainerRef.current && !mapRef.current) {
          // 使用当时可用的用户位置作为中心点
          const center = userLocation;

          const map = new (window as any).AMap.Map(mapContainerRef.current, {
            viewMode: '2D',
            zoom: 14,
            center: center,
            mapStyle: 'amap://styles/normal',
            resizeEnable: true
          });

          mapRef.current = map;
        }
      } catch (error) {
        console.error('Failed to load map:', error);
      }
    };

    loadMap();

    // 仅在组件卸载时销毁地图
    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <section className="flex-1 relative">
      <div
        id="mapContainer"
        ref={mapContainerRef}
        className="w-full h-full border-0"
        style={{ height: '100%' }}
      ></div>
    </section>
  );
}