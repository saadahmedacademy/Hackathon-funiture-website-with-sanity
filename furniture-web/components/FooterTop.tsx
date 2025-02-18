import { Clock, MapPin, Phone } from "lucide-react";
import React from "react";
import { MdEmail } from "react-icons/md";

interface Props {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
}

export const FooterTop = () => {
    const FooterTopData = [
        {
            title: "Visit Us",
            subtitle: "Karachi, Pakistan",
            icon: <MapPin className="text-gray-600 group-hover:text-darkColor transition-colors " />,
        },
        {
            title: "Call Us",
            subtitle: "+92305-3431528",
            icon: <Phone className="text-gray-600 group-hover:text-darkColor transition-colors" />,
        },
        {
            title: "Email Us",
            subtitle: "avion@gmail.com",
            icon: <MdEmail className="text-gray-600 group-hover:text-darkColor transition-colors" />,
        },
        {
            title: "Service Hours",
            subtitle: "Mon - Sat 8:00am - 6:00pm",
            icon: <Clock className="text-gray-600 group-hover:text-darkColor transition-colors" />,
        },
    ];

    return (
        <main className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 px-3 py-4 border-y">
            {FooterTopData.map((item, index) => (
                <ContactItems key={index} title={item.title} subtitle={item.subtitle} icon={item.icon} />
            ))}
        </main>
    );
};

const ContactItems = ({ title, subtitle, icon }: Props) => {
    return (
        <div className="flex md:flex-row flex-col gap-3 items-center justify-center   
     hover:shadow-lg transition-shadow group rounded-md group-hover:bg-gray-50 group-hover:border-gray-300 transition-none px-2 py-2  ">
            <span className='md:pt-1 pt-0'>{icon}</span>
            <div className="flex flex-col items-center justify-center gap-2 font-semibold text-gray-900">
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600 text-sm text-center">{subtitle}</p>
            </div>
        </div>
    );
}; 
