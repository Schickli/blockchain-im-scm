/* eslint-disable @typescript-eslint/no-explicit-any */
export type Step = {
    id: number;
    title: string;
    icon: any; 
    action: {
        cta: string;
        loading: {
            title: string;
            description: string;
        };
        success: {
            title: string;
            description: string;
        }
        action: (element: any) => Promise<boolean>;
    };
}
/* eslint-enable @typescript-eslint/no-explicit-any */