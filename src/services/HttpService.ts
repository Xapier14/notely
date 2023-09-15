export interface HttpServiceInterface {
  get: (url: string) => Promise<any>;
}

class HttpServiceImpl implements HttpServiceInterface {
  constructor() {
    this.get = this.get.bind(this);

    console.log("HttpService initialized");
  }

  async get(url: string): Promise<any> {
    console.log(`HttpService.get(${url})`);
    const response = await fetch(url);
    return await response.json();
  }
}

const HttpService: HttpServiceInterface = new HttpServiceImpl();

export default HttpService;
