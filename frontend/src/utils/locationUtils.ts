/**
 * 位置工具类
 * 提供获取用户当前位置的功能
 */
export class LocationUtils {
  /**
   * 获取用户当前位置
   * @param options 位置获取选项
   * @returns Promise 返回包含经纬度的Promise对象
   */
  static getCurrentPosition(options?: PositionOptions): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      // 检查浏览器是否支持 Geolocation API
      if (!navigator.geolocation) {
        reject(new Error("您的浏览器不支持地理位置服务"));
        return;
      }

      // 默认选项
      const defaultOptions: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5分钟内的缓存位置
      };

      // 合并选项
      const finalOptions = { ...defaultOptions, ...options };

      // 获取当前位置
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve([longitude, latitude]); // 返回[经度,纬度]格式，符合高德地图要求
        },
        (error) => {
          let errorMessage = "获取位置失败";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "用户拒绝了位置访问请求";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "位置信息不可用";
              break;
            case error.TIMEOUT:
              errorMessage = "获取位置超时";
              break;
            default:
              errorMessage = error.message || "未知错误";
              break;
          }
          reject(new Error(errorMessage));
        },
        finalOptions
      );
    });
  }

  /**
   * 持续监视用户位置变化
   * @param options 位置获取选项
   * @param callback 位置变化回调函数
   * @returns 返回一个可以停止监视的函数
   */
  static watchPosition(
    callback: (position: [number, number]) => void,
    options?: PositionOptions
  ): () => void {
    // 检查浏览器是否支持 Geolocation API
    if (!navigator.geolocation) {
      console.error("您的浏览器不支持地理位置服务");
      return () => {};
    }

    // 默认选项
    const defaultOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0 // 不使用缓存
    };

    // 合并选项
    const finalOptions = { ...defaultOptions, ...options };

    // 开始监视位置变化
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        callback([longitude, latitude]); // 返回[经度,纬度]格式，符合高德地图要求
      },
      (error) => {
        console.error("位置监视错误:", error);
      },
      finalOptions
    );

    // 返回停止监视的函数
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }
}