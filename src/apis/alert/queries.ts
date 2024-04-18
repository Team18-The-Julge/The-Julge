import AlertService from '@/apis/alert/Alert.service';
import { BaseQuery } from '@/apis/common.type';

const queryKeys = {
  getAlerts: (userId: string, params: BaseQuery) => ['getUserAlerts', { userId, params }] as const,
  putAlert: (userId: string, alertId: string) => ['putAlert', { userId, alertId }] as const
};

const queryOptions = {
  getAlerts: (userId: string, params: BaseQuery) => ({
    queryKey: queryKeys.getAlerts(userId, params),
    queryFn: () => AlertService.getAlerts(userId, params)
  }),
  putAlert: (userId: string, alertId: string) => ({
    mutationKey: queryKeys.putAlert(userId, alertId),
    mutationFn: () => AlertService.putAlert(userId, alertId)
  })
};

export default queryOptions;
