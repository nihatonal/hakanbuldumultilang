"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations"; // varsa
import { Button } from "@/components/ui/button";

const center = { lat: 39.8803, lng: 32.8359 };

export default function ContactMap() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    if (!isLoaded)
        return (
            <div className="flex justify-center items-center h-96 text-muted-foreground">
                Harita yükleniyor...
            </div>
        );

    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
        >
            <Card className="bg-card border-none md:p-6 rounded-xl overflow-hidden px-0">
                <div className="aspect-video relative">
                    <GoogleMap
                        zoom={16}
                        center={center}
                        mapContainerClassName="w-full h-full rounded-md"
                        options={{
                            disableDefaultUI: true,
                            zoomControl: true,
                            styles: [
                                {
                                    featureType: "poi",
                                    elementType: "labels",
                                    stylers: [{ visibility: "off" }],
                                },
                            ],
                        }}
                    >
                        <Marker position={center} />
                    </GoogleMap>

                    {/* Üstte adres bilgisi overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                        <h3 className="font-semibold text-lg">
                            Yıldız Evler Mahallesi, Rabindranath Tagore Cd. 29/10
                        </h3>
                        <p className="text-sm text-gray-200">Çankaya / Ankara</p>

                    </div>
                </div>
                <div className='w-full flex items-center justify-center pb-2'>
                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 md:mt-6 bg-secondary text-primary cursor-pointer border-white hover:bg-secondary hover:text-primary/80"
                        onClick={() =>
                            window.open(
                                "https://www.google.com/maps?q=Yildizevler+mahallesi+Rabindranath+Tagore+Caddesi+29/10,+Çankaya,+Ankara",
                                "_blank"
                            )
                        }
                    >
                        Haritada Görüntüle
                    </Button>   
                </div>

            </Card>
        </motion.div>
    );
}
