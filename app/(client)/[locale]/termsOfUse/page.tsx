import { Metadata } from 'next'
import Container from '@/components/Container'

export const metadata: Metadata = {
    title: 'Kullanım Şartları | Hakan Buldu',
    description: 'Bu web sitesini kullanmadan önce lütfen bu kullanım şartlarını dikkatlice okuyunuz. Siteyi kullanmanız, bu şartları kabul ettiğiniz anlamına gelir.'
}

export default function Page() {
    return (
        <div className='bg-background text-primary'>
            <Container>
                <article className="prose prose-blue dark:prose-invert max-w-3xl mx-auto py-12">
                    <h1 className="text-3xl font-bold mb-6">Kullanım Şartları</h1>

                    <p>Son güncelleme: 28.09.2025</p>

                    <p>
                        Bu kullanım şartları, www.hakanbuldu.com web sitesinin kullanımına ilişkin koşulları düzenler.
                        Bu siteye erişerek veya kullanarak, bu şartları kabul etmiş sayılırsınız.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Kullanıcı Yükümlülükleri</h2>
                    <ul>
                        <li>Siteyi yasal amaçlarla ve yasalara uygun şekilde kullanmakla yükümlüsünüz.</li>
                        <li>Üçüncü kişilerin haklarına zarar verecek veya siteye zarar verecek davranışlardan kaçınmalısınız.</li>
                        <li>İzinsiz içerik paylaşımı, spam gönderimi, zararlı yazılım yayma gibi eylemler yasaktır.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. Fikri Mülkiyet</h2>
                    <p>
                        Web sitesindeki tüm içerikler (yazılar, görseller, logolar, videolar) Hakan Buldu’ya aittir veya lisanslıdır.
                        Aşağıdakiler izinsiz yapılamaz:
                    </p>
                    <ul>
                        <li>İçeriklerin tamamının veya bir kısmının kopyalanması, çoğaltılması</li>
                        <li>Herhangi bir medya veya platformda paylaşılması</li>
                        <li>Ticari amaçla kullanımı</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. Hizmetin Sürekliliği</h2>
                    <p>
                        Web sitesinin kesintisiz çalışacağı veya hatasız olacağı garanti edilmez.
                        Sitede yer alan içerikler önceden haber verilmeksizin değiştirilebilir veya yayından kaldırılabilir.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">4. Sorumluluk Reddi</h2>
                    <p>
                        Web sitesinde yer alan bilgiler yalnızca genel bilgilendirme amacı taşır ve hukuki danışmanlık olarak değerlendirilmemelidir.
                        Kullanıcının bu bilgilerle hareket etmesinden doğabilecek sonuçlardan sorumluluk kabul edilmez.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">5. Değişiklik Hakkı</h2>
                    <p>
                        Bu kullanım şartları, herhangi bir zamanda güncellenebilir. Güncellenmiş sürüm sitede yayımlandığı anda yürürlüğe girer.
                    </p>
                </article>
            </Container>
        </div>
    )
}
