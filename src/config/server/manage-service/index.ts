import departmentController from './department.controller'
import roleController from './role.controller'
import userController from './user.controller'
import systemLogsController from './system.logs.controller'
import systemBackupController from './system.backup.controller'
import systemParameterController from './system.parameter.controller'

export const manageService = {
  departmentController,
  roleController,
  userController,
  systemLogsController,
  systemBackupController,
  systemParameterController
}