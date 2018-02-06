import { requestType } from '~/config/enum.config'

const SERVICE = 'service-manage'
const CONTROLLER = 'user'

export default {
    /**
     * 分页查询角色列表
     */
    getUsersByDeptPage: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'getUsersByDeptPage',
        type: requestType.Get
    },
    /**
     * 新增用户
     */
    createUser: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'createUser',
        type: requestType.Post
    },
    /**
     * 修改用户
     */
    updateUser: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'updateUser',
        type: requestType.Post
    },
    /**
     * 给用户分配角色
     */
    userAllocateRoles: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'userAllocateRoles',
        type: requestType.Post
    },
    /**
     * 批量分配用户角色
     */
    userBatchAllocateRoles: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'userBatchAllocateRoles',
        type: requestType.Post
    },
    /**
     * 获取用户所属角色
     */
    findRolesByUserId: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'findRolesByUserId',
        type: requestType.Get
    },
    /**
     * 用户注册
     */
    userRegister: {
        service: SERVICE,
        controller: CONTROLLER,
        action: 'userRegister',
        type: requestType.Post
    }
}