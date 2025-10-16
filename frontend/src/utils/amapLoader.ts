// 高德地图API加载工具类
export class AmapLoader {
  private static instance: AmapLoader;
  private isLoaded = false;
  private loadingPromise: Promise<void> | null = null;

  private constructor() {}

  public static getInstance(): AmapLoader {
    if (!AmapLoader.instance) {
      AmapLoader.instance = new AmapLoader();
    }
    return AmapLoader.instance;
  }

  /**
   * 加载高德地图API
   * @returns Promise<void>
   */
  public async load(): Promise<void> {
    if (this.isLoaded) {
      return Promise.resolve();
    }

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Window object is not available'));
        return;
      }

      // 检查是否已经加载
      if ((window as any).AMap) {
        this.isLoaded = true;
        resolve();
        return;
      }

      // 动态加载高德地图JS API
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://webapi.amap.com/maps?v=2.0&key=${import.meta.env.VITE_AMAP_API_KEY}`;

      script.onload = () => {
        this.isLoaded = true;
        resolve();
      };

      script.onerror = () => {
        reject(new Error('Failed to load Amap API'));
      };

      document.head.appendChild(script);
    });

    return this.loadingPromise;
  }
}
