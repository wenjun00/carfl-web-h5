// 收款service
import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { FilterService } from "~/utils/filter.service"

export class CompanyAccountService {
    @Inject(NetService)
    private netService: NetService
    /**
     * 分页查询所有企业开户信息
     */
    getAllAccountWithPage(data, page) {
        return this.netService.send({
            server: manageService.companyAccountController.getAllAccountWithPage,
            data: data,
            page: page
        })
    }
    /**
     * 企业开户
     */
    companyOpenAccount(data) {
        return this.netService.send({
            server: manageService.companyAccountController.companyOpenAccount,
            data: {
                accountChannel: data.accountChannel, //开户渠道（1138表示汇付； 1139表示富友,）
                accountType: 1176, // 账户类型（1175个人账户，1176企业账户）
                companyLicensenNmber: data.companyLicensenNmber, // 营业执照注册号
                organizationCode: data.organizationCode,	// 组织机构代码
                taxRegistration: data.taxRegistration, // 税务登记证号
                socialCreditCode: data.socialCreditCode, // 统一社会信用代码
                certificateType: data.certificateType,// 企业证照类型
                companyType: data.companyType, // 企业类型
                companyName: data.companyName, // 企业名称
                licenseBeginTime: data.licenseBeginTime, // 证照起始日期
                licenseEndTime: data.licenseEndTime, // 证照结束日期
                companyPhone: data.companyPhone, // 企业固定电话
                controllShareholder: data.controllShareholder, // 控股股东
                registAddr: data.registAddr, // 企业注册地址
                busnessAddr: data.busnessAddr, // 企业经营地址
                busnessScope: data.busnessScope, // 经营范围
                legalman: data.legalman, // 法人代表姓名
                linkmanMail: data.linkmanMail, // 企业联系人邮箱
                legpersonCertificate: data.legpersonCertificate, // 法人证件类型
                legpersonCertificateNumber: data.legpersonCertificateNumber, // 法人证件号码
                legpersonCertificateStime: data.legpersonCertificateStime, // 法人证件起始日期
                legpersonCertificateEtime: data.legpersonCertificateEtime, // 法人证件起始日期
                linkman: data.linkman, // 企业联系人
                legpersonPhoneNumber: data.legpersonPhoneNumber, // 法人手机号码
                bankcardDetail: {
                    depositBank: data.depositBank, // 开户银行
                    accountName: data.accountName, // 开户账户名
                    branchName: data.branchName, // 支行
                    accountProvince: data.accountProvince, // 开户银行所在省份
                    accountCity: data.accountCity // 开户银行所在市
                }
            }
        })
    }
    /**
     * 修改企业开户
     */
    editAccount(data) {
        return this.netService.send({
            server: manageService.companyAccountController.editAccount,
            data
        })
    }
    /**
     * 查看单个企业开户信息
     */
    finAccountDetail({ id }) {
        return this.netService.send({
            server: manageService.companyAccountController.finAccountDetail,
            data: {
                id: id
            }
        })
    }
}