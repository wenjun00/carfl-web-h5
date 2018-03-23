import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class CarService {
  @Inject(NetService)
  private netService: NetService

  /**
   * 获取所有车辆系列
   */
  findAllCarSeries(data?) {
    return this.netService.send({
      server: manageService.carController.findAllCarSeries,
      data: data
    })
  }
  /**
   * 查询车辆系列下所有车辆
   */
  findAllCarBySeries({ seriesId, brandId, carId }) {
    return this.netService.send({
      server: manageService.carController.findAllCarBySeries,
      data: {
        seriesId: seriesId,
        brandId : brandId,
        carId : carId
      }
    })
  }
  /**
   * 新增车辆
   */
  addVehicle(data) {
    return this.netService.send({
      server: manageService.carController.addVehicle,
      data: data
    })
  }
  /**
   * 搜索
   */
  seachCar({ carParam }) {
    return this.netService.send({
      server: manageService.carController.seachCar,
      data: {
        carParam: carParam
      }
    })
  }
  /**
   * 修改车辆信息
   */
  updateVehicle(data) {
    return this.netService.send({
      server: manageService.carController.updateVehicle,
      data: data
    })
  }
  /**
   * 所有品牌
   */
  getAllBrand() {
    return this.netService.send({
      server: manageService.carController.getAllBrand,
    })
  }
  /**
   * 所有型号
   */
  getAllModel() {
    return this.netService.send({
      server: manageService.carController.getAllModel,
    })
  }
  /**
   * 所有系列
   */
  getAllSeries() {
    return this.netService.send({
      server: manageService.carController.getAllSeries,
    })
  }
  /**
   * 根据车辆id获取车辆系列
   */
  getSeriesByBrandId({ brandId }) {
    return this.netService.send({
      data: {
        brandId: brandId
      },
      server: manageService.carController.getSeriesByBrandId,
    })
  }
  /**
   * 新增系列
   */
  createCarSeries({ brandId, seriesName }) {
    return this.netService.send({
      data: {
        brandId: brandId,
        seriesName: seriesName
      },
      server: manageService.carController.createCarSeries,
    })
  }
  /**
   * 根据车辆系列id获取车辆品牌
   */
  getCarBrandBySeriesId({ seriesId }) {
    return this.netService.send({
      data: {
        seriesId: seriesId
      },
      server: manageService.carController.getCarBrandBySeriesId,
    })
  }
  /**
   * 新增车辆品牌
   */
  createCarBrand({ brandName }) {
    return this.netService.send({
      data: {
        brandName: brandName
      },
      server: manageService.carController.createCarBrand,
    })
  }
}