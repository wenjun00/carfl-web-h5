export class PageService {
  public pageIndex: number;
  public total: number;
  public totalPage: number
  public pageSize: number;
  public loading: boolean;
  public pageSizeOpts: Array<number>
  public layout: string

  constructor() {
    this.total = 0
    this.pageIndex = 1
    this.pageSize = 10
    this.loading = false
    this.pageSizeOpts = [10, 20, 30, 40]
    this.layout = 'total, sizes, prev, pager, next, jumper'
  }

  /**
   * 获取分页配置信息
   */
  getConfig() {
    return {
      page: this.pageIndex,
      size: this.pageSize
    }
  }

  /**
   * 更新分页配置信息
   * @param param
   */
  update({ total, pages }) {
    console.log(total, pages)
    this.total = parseInt(total)
    this.totalPage = parseInt(pages)
  }
}
