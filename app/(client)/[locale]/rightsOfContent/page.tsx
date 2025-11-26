import { Metadata } from 'next'
import Container from '@/components/Container'

export const metadata: Metadata = {
    title: 'Telif ve Marka Hakları | Hakan Buldu',
    description: 'Bu sitedeki tüm içerikler telif hakkı ile korunmaktadır. İzinsiz kopyalama, çoğaltma veya paylaşım hukuka aykırıdır.'
}

export default function Page() {
    return (
        <div className='bg-background text-primary'>
            <Container>
                <article className="prose prose-blue dark:prose-invert max-w-3xl mx-auto py-12">
                    <h1 className="text-3xl font-bold mb-6">Telif ve Marka Hakları</h1>

                    <p>Son güncelleme tarihi: 28.09.2025</p>

                    <p>
                        www.hakanbuldu.com web sitesinde yer alan tüm içerikler, 5846 sayılı Fikir ve Sanat Eserleri
                        Kanunu kapsamında korunmakta olup, Hakan Buldu’nun mülkiyetindedir.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Telif Hakları</h2>
                    <ul>
                        <li>
                            Sitedeki yazılar, makaleler, görseller, grafikler ve her türlü dijital içerik telif koruması altındadır.
                        </li>
                        <li>
                            Bu içerikler izinsiz olarak kopyalanamaz, çoğaltılamaz, yeniden yayınlanamaz veya ticari amaçla kullanılamaz.
                        </li>
                        <li>
                            İçeriğin tümü veya bir kısmı, yazılı izin olmaksızın başka bir platformda veya yayında kullanılamaz.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. Alıntı ve Paylaşım Koşulları</h2>
                    <ul>
                        <li>
                            Bilgilendirme amacıyla sınırlı alıntı yapılmasına izin verilebilir ancak mutlaka açık kaynak gösterimi yapılmalıdır.
                        </li>
                        <li>
                            Alıntı yapılan içerikler bağlamından kopartılamaz, yanıltıcı biçimde sunulamaz.
                        </li>
                        <li>
                            Blog yazılarının tümünün kopyalanması veya yeniden yayınlanması kesinlikle yasaktır.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. Marka ve Logo Kullanımı</h2>
                    <ul>
                        <li>
                            “Hakan Buldu” adı ve logosu marka değeri taşır ve izinsiz kullanılamaz.
                        </li>
                        <li>
                            Logonun herhangi bir şekilde değiştirilmesi, taklit edilmesi veya üçüncü taraflara devri yasaktır.
                        </li>
                        <li>
                            Marka unsurlarını kullanmak isteyen kişi veya kuruluşların önceden yazılı izin alması gerekmektedir.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">4. Hukuki Yaptırımlar</h2>
                    <p>
                        Bu politikaya aykırı hareket eden kişi veya kurumlara karşı, fikri mülkiyet ihlali nedeniyle yasal süreç başlatılabilir.
                        Maddi ve manevi tazminat talepleri dahil olmak üzere her türlü hukuki hakkımız saklıdır.
                    </p>

                    <p>
                        İçerik kullanımı veya izin talepleri için lütfen bizimle iletişime geçin:{" "}
                        <a href="mailto:info@hakanbuldu.com" className="text-blue-600 underline">info@hakanbuldu.com</a>
                    </p>
                </article>
            </Container>
        </div>
    )
}
