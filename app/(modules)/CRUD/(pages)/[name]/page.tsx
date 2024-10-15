'use client'

import { useUserConfig } from '@/app/context/UserConfigContext';
import { useParams, useRouter } from 'next/navigation'
import CrudComponent from '../../components/components/CrudComponent';
import { useEffect, useState } from 'react';
import { CrudModule } from '@/@types/types';

export default function CRUDPage() {
    const { name } = useParams();
    const router = useRouter();

    const { isAValidPage, getModuleProps, hasPermission } = useUserConfig();

    if (!isAValidPage('CRUD', name as string) || !hasPermission('CRUD', name as string)) {
        router.push('/not-found');
    }

    const [crudProps, setCrudProps] = useState<CrudModule.Props | null>(null);

    useEffect(() => {
        const loadCrudProps = () => {
            const props = getModuleProps('CRUD', name as string);
            setCrudProps(props);
        };

        loadCrudProps();
    }, [name]);


return (
    <div className="min-h-screen">
        {crudProps && <CrudComponent crudProps={crudProps} />}
    </div>
);
}
