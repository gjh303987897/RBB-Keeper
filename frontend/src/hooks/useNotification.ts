import { notification } from 'antd';
import type { NotificationInstance } from 'antd/es/notification/interface';
import { useMemo } from 'react';

type NotificationType = Exclude<keyof NotificationInstance, 'open' | 'destroy'>;

export function useNotification() {
    const [api, container] = notification.useNotification();

    const handler = useMemo(() => ({
        open: (type: NotificationType, title: string, desc: string) => {
            api[type]({
                title: title,
                description: desc,
                placement: 'bottomRight',
                duration: 3,
                showProgress: true,
            });
        },
        container
    }), [api])

    return handler
}