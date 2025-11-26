import { Metadata } from 'next'
import Container from '@/components/Container'

export const metadata: Metadata = {
    title: 'Çerez Politikası | Hakan Buldu',
    description: 'Bu site çerezleri, kullanıcı deneyimini geliştirmek ve site trafiğini analiz etmek için kullanır. Çerez kullanımımız hakkında daha fazla bilgi edinin.'
}

export default function Page() {
    return (
        <div className='bg-background text-primary'>
            <Container>
                <article className="prose prose-blue dark:prose-invert max-w-3xl mx-auto py-12">
                    <h1 className="text-3xl font-bold mb-6">Çerez Politikası</h1>

                    <p>Son güncelleme tarihi: 28.09.2025</p>

                    <p>
                        Bu web sitesi, kullanıcı deneyimini iyileştirmek, içerik ve reklamları kişiselleştirmek,
                        sosyal medya özellikleri sunmak ve trafiği analiz etmek amacıyla çerezler kullanır.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Çerez Nedir?</h2>
                    <p>
                        Çerez (cookie), bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza
                        kaydedilen küçük metin dosyalarıdır. Bu dosyalar, web sitesi kullanım bilgilerinizi hatırlamaya
                        ve kullanıcı deneyimini geliştirmeye yardımcı olur.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. Kullandığımız Çerez Türleri</h2>
                    <ul>
                        <li><strong>Zorunlu Çerezler:</strong> Web sitesinin düzgün çalışması için gereklidir.</li>
                        <li><strong>İşlevsel Çerezler:</strong> Kullanıcının tercihlerini hatırlamak için kullanılır.</li>
                        <li><strong>Performans / Analitik Çerezler:</strong> Site kullanımını analiz ederek hizmet kalitesini artırır.</li>
                        <li><strong>Reklam / Hedefleme Çerezleri:</strong> İlgi alanlarınıza uygun reklamlar sunmak için kullanılır.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. Üçüncü Taraf Çerezler</h2>
                    <p>
                        Web sitemiz, Google Analytics gibi hizmet sağlayıcıları tarafından yerleştirilen üçüncü taraf çerezleri kullanabilir.
                        Bu çerezler, kullanıcı davranışlarını anonim olarak izlemek için kullanılır.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">4. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
                    <p>
                        Tarayıcınızın ayarlarını değiştirerek çerezleri engelleyebilir veya silebilirsiniz. Ancak bu durumda
                        web sitesinin bazı işlevleri düzgün çalışmayabilir.
                    </p>
                    <ul>
                        <li>Google Chrome: Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler</li>
                        <li>Mozilla Firefox: Tercihler &gt; Gizlilik ve Güvenlik</li>
                        <li>Safari: Tercihler &gt; Gizlilik</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">5. Değişiklikler</h2>
                    <p>
                        Bu çerez politikası zaman zaman güncellenebilir. Yapılan değişiklikler web sitemizde yayımlandığı anda yürürlüğe girer.
                    </p>
                </article>
            </Container>
        </div>
    )
}
