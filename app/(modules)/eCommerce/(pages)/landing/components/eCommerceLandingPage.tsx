import { ECommerceModule } from "@/@types/types";
import News from "./news";
import PrincipalCategories from "./principalCategories";
import { useUserConfig } from "@/app/context/UserConfigContext";

export default function ECommerceLanding(){

    const { getModuleProps } = useUserConfig();

    const eCommerceProps = getModuleProps('Landing', 'index') as unknown as ECommerceModule.LandingProps;


    if(!eCommerceProps) return null;

    
    return(
        <>
            <News props={eCommerceProps}/>
            {eCommerceProps?.enabled && <PrincipalCategories categories={eCommerceProps?.categories} />}
        </>
    )
}