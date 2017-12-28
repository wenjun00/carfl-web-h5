export class PageService {
  public pageIndex: number;
  public total: number;
  public pageSize: number;
  public loading: boolean;
  public totalPage :number

  public showElevator:boolean;
  public pageSizeOpts:Array<number>

  constructor() {
    this.total = 0
    this.pageIndex = 1
    this.pageSize = 10
    this.loading = false
    this.showElevator = true
    this.pageSizeOpts = [10,20,30,40]
  }

  /**
   * 获取分页配置信息
   */
  getConfig() {
    return {
      page: this.pageIndex - 1,
      size: this.pageSize
    }
  }

  /**
   * 更新分页配置信息
   * @param param
   */
  update({ totalElements, totalPages }) {
    this.total = totalElements
    this.totalPage = totalPages
  }
}
