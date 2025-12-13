import Image from "next/image";

export default function MaintenancePage() {
    return (
        <main className="min-h-screen w-full grid place-items-center bg-gradient-to-br from-slate-100 via-slate-500 to-slate-800 px-6">
            <div className="max-w-xl w-full text-center">
                {/* Image */}
                <div className="mb-8 flex justify-center">
                    <Image
                        src="/maintenance.png"
                        alt="Site under maintenance"
                        width={320}
                        height={320}
                        priority
                        className="mx-auto"
                    />
                </div>

                {/* Badge */}
                <span className="inline-block mb-4 rounded-full bg-yellow-400/10 px-4 py-1 text-sm font-medium text-yellow-400">
                    🚧 Bakım Modu
                </span>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                    Site şu anda geliştirme aşamasında
                </h1>

                {/* Description */}
                <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                    Daha iyi bir deneyim sunabilmek için üzerinde çalışıyoruz.
                    Çok yakında tekrar yayında olacağız.
                </p>
            </div>
        </main>
    );
}
