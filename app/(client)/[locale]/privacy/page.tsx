import { Metadata } from 'next'
import Container from '@/components/Container'

export const metadata: Metadata = {
    title: 'Gizlilik Politikası | Hakan Buldu',
    description: 'Ziyaretçilerimizin gizliliğini korumayı taahhüt ediyoruz. Bu gizlilik politikası, kişisel verilerin nasıl toplandığını, işlendiğini ve korunduğunu açıklar.'
}

export default function Page() {
    return (
        <div className='bg-background text-primary'>
            <Container>
                <article className="prose prose-blue dark:prose-invert max-w-3xl mx-auto py-12">
                    <h1 className="text-3xl font-bold mb-6">Gizlilik Politikası</h1>

                    <p>Son güncelleme tarihi: 28.09.2025</p>

                    <p>
                        Bu gizlilik politikası, www.hakanbuldu.com web sitesi üzerinden toplanan kişisel verilerin,
                        6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR)
                        uyarınca nasıl işlendiğini açıklar.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Hangi Verileri Topluyoruz?</h2>
                    <ul>
                        <li>Ad, soyad, e-posta adresi ve telefon numarası gibi iletişim verileri</li>
                        <li>IP adresi, coğrafi konum, tarayıcı türü ve işletim sistemi bilgileri</li>
                        <li>Kullanıcı davranış verileri (sayfa ziyaretleri, tıklamalar, form gönderimleri)</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. Verileri Nasıl Topluyoruz?</h2>
                    <ul>
                        <li>İletişim formları aracılığıyla doğrudan</li>
                        <li>Çerezler ve benzeri teknolojiler yoluyla</li>
                        <li>Otomatik loglama sistemleriyle</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. Verileriniz Ne Amaçla Kullanılır?</h2>
                    <ul>
                        <li>Hizmet sunmak ve geliştirmek</li>
                        <li>Yasal yükümlülükleri yerine getirmek</li>
                        <li>Talep edilen bilgilere yanıt vermek</li>
                        <li>Onayınız doğrultusunda pazarlama iletişimi kurmak</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">4. Verilerin Saklanma Süresi</h2>
                    <p>
                        Kişisel verileriniz, işlendikleri amaç sona erdiğinde ve yasal saklama süresi dolduğunda
                        silinir, yok edilir veya anonim hale getirilir.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">5. Verileriniz Kiminle Paylaşılır?</h2>
                    <ul>
                        <li>Teknik hizmet sağlayıcılarımız (ör. barındırma hizmetleri)</li>
                        <li>Yetkili kamu kurumları (yasal zorunluluk halinde)</li>
                        <li>Onayınızla birlikte üçüncü taraflarla</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">6. Haklarınız</h2>
                    <ul>
                        <li>Kişisel verilerinize erişme</li>
                        <li>Düzeltme, silme veya kısıtlama talep etme</li>
                        <li>İtiraz etme ve şikâyet başvurusunda bulunma (KVKK/GDPR kapsamında)</li>
                    </ul>

                    <p>
                        Haklarınızı kullanmak veya sorularınızı iletmek için bize{' '}
                        <a href="mailto:info@hakanbuldu.com" className="text-blue-600 underline">info@avhakanbuldu.com</a>{' '}
                        adresinden ulaşabilirsiniz.
                    </p>
                </article>
            </Container>
        </div>
    )
}
