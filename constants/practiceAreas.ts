import { Gavel, Landmark, Home, Building2 } from "lucide-react";

type PracticesData = {
  [key: string]: {
    icon: any;
    title: string;
    slug: string;
    description: string;
    services: string[];
    experience: string;
    detailTitle: string;
    detailDescription: string;
    detailedServices: { title: string; description: string }[];
    faq: { question: string; answer: string }[];
    examples: { case: string }[];
  }[];
};

export const practicesData: PracticesData = {
  tr: [
    {
      icon: "Gavel",
      title: "Ceza Hukuku Danışmanlığı",
      slug: "ceza-hukuku",
      description:
        "Ceza hukuku konularında bilgi ve danışmanlık hizmeti sunuyorum. Haklarınız ve süreçler hakkında kapsamlı rehberlik sağlıyorum.",
      services: [
        "Ceza hukuku süreçleri hakkında bilgilendirme",
        "Hak ve yükümlülüklerin açıklanması",
        "Olası hukuki adımların rehberliği",
        "Hukuki sorulara yanıt ve yönlendirme",
      ],
      experience: "10+ yıl hukuk bilgisi ve danışmanlık deneyimi",
      detailTitle: "Ceza Hukuku Hakkında Detaylı Bilgilendirme",
      detailDescription:
        "Ceza hukuku konularında kapsamlı bilgi sağlıyorum. Tutuklama, gözaltı, suç tipleri ve olası hukuki süreçler hakkında danışmanlık veriyorum. Davalar için aktif temsil hizmeti sunulmamaktadır.",
      detailedServices: [
        {
          title: "Ceza Hukuku Süreçleri",
          description:
            "Tutuklama, gözaltı, soruşturma ve kovuşturma süreçlerinin nasıl işlediğini detaylı şekilde açıklıyorum.",
        },
        {
          title: "Haklar ve Yükümlülükler",
          description:
            "Şüpheli ve mağdur hakları, savunma hakları ve yasal prosedürler hakkında bilgilendirme yapıyorum.",
        },
        {
          title: "Danışmanlık ve Sorular",
          description:
            "Her türlü hukuki sorunuz için rehberlik sağlıyor, alternatif çözüm yollarını açıklıyorum.",
        },
      ],
      faq: [
        {
          question: "Gözaltına alındığımda neler yapmalıyım?",
          answer:
            "Hukuki haklarınızı bilmek çok önemlidir. Kimlik bilgilerinizi doğrulamak, avukat talep etmek ve ifadelerinizi kayda geçirmek kritik adımlardır.",
        },
        {
          question: "Tutuklama süreci ne kadar sürer?",
          answer:
            "Tutuklama süresi olayın niteliğine göre değişir. Süreç ve haklar hakkında detaylı bilgi almak için danışmanlık sağlayabilirim.",
        },
        {
          question: "Ceza hukuku ile ilgili sorularımı nasıl iletebilirim?",
          answer:
            "Telefon veya e-posta aracılığıyla sorularınızı iletebilir, hızlı ve doğru bilgiler alabilirsiniz.",
        },
      ],
      examples: [
        {
          case: "Bir kişi gözaltına alındığında haklarını bilmiyordu. Hakları ve sürecin işleyişi kendisine adım adım açıklanarak bilgilendirme yapıldı.",
        },
        {
          case: "Suç isnadıyla ilgili bilgi almak isteyen bir kişi, sürecin aşamaları ve olası sonuçlar hakkında bilgilendirildi.",
        },
      ],
    },
    {
      icon: "Landmark",
      title: "İdare Hukuku Danışmanlığı",
      slug: "idare-hukuku",
      description:
        "İdare hukuku ile ilgili bilgi ve danışmanlık sağlıyorum. İdari işlemler, kararlar ve haklarınız hakkında rehberlik sunuyorum.",
      services: [
        "İdari işlemler ve süreçler hakkında bilgilendirme",
        "Haklarınız ve yükümlülükler hakkında açıklama",
        "Dilekçe, itiraz ve başvuru süreçlerinin rehberliği",
        "Hukuki sorulara yanıt ve yönlendirme",
      ],
      experience: "9+ yıl hukuk bilgisi ve danışmanlık deneyimi",
      detailTitle: "İdare Hukuku Hakkında Detaylı Bilgilendirme",
      detailDescription:
        "İdare hukuku alanında kararlar, idari işlemler ve itiraz mekanizmaları hakkında detaylı bilgi sağlıyorum. Henüz dava veya temsil hizmeti sunulmamaktadır.",
      detailedServices: [
        {
          title: "İdari İşlemler ve Kararlar",
          description:
            "İdarenin aldığı kararlar ve yaptıkları işlemler hakkında kapsamlı bilgilendirme yapıyorum.",
        },
        {
          title: "Haklar ve Yükümlülükler",
          description:
            "İdari haklarınız, başvuru ve itiraz yolları hakkında rehberlik sağlıyorum.",
        },
        {
          title: "Danışmanlık ve Soru-Cevap",
          description:
            "Sorularınızı alıyor ve size en doğru bilgilendirmeyi sunuyorum.",
        },
      ],
      faq: [
        {
          question: "İdari itiraz nasıl yapılır?",
          answer:
            "İtirazın süresi, formatı ve içeriği kanunda belirtilmiştir. Danışmanlık ile adım adım yönlendirme sağlayabilirim.",
        },
        {
          question: "Ruhsat iptali durumunda haklarım nelerdir?",
          answer:
            "Ruhsat iptali ve benzeri kararlar karşısında haklarınızı anlamak kritik önemdedir. Detaylı bilgi için danışmanlık talep edebilirsiniz.",
        },
        {
          question: "İdari süreçler ne kadar sürer?",
          answer:
            "Süreçler olayın niteliğine göre değişiklik gösterir. Süreç takibi ve rehberlik sağlayabilirim.",
        },
      ],
      examples: [
        {
          case: "Bir kişi, ruhsat iptali işlemiyle karşılaştığında süreç adımları ve yasal hakları hakkında bilgilendirildi.",
        },
        {
          case: "İdari başvuru hazırlığında olan bir kişi, gerekli belgeler ve sürecin işleyişi konusunda rehberlik aldı.",
        },
      ],
    },
    {
      icon: "Building2",
      title: "İş Hukuku Danışmanlığı",
      slug: "is-hukuku",
      description:
        "İş hukuku alanında bilgilendirme ve danışmanlık sağlıyorum. İş sözleşmeleri, işten çıkarılma ve iş uyuşmazlıkları hakkında rehberlik sunuyorum.",
      services: [
        "İş hukuku süreçleri ve haklar hakkında bilgilendirme",
        "İş sözleşmeleri ve işten çıkarılma prosedürleri hakkında rehberlik",
        "İş uyuşmazlıkları ve hak talepleri hakkında danışmanlık",
        "Hukuki sorulara yanıt ve çözüm önerileri",
      ],
      experience: "7+ yıl hukuk bilgisi ve danışmanlık deneyimi",
      detailTitle: "İş Hukuku Hakkında Detaylı Bilgilendirme",
      detailDescription:
        "İş hukuku konularında bilgilendirme sağlıyorum. İş sözleşmeleri, işten çıkarılma, fazla mesai, tazminat hakları gibi konularda rehberlik sunuyorum. Henüz dava veya temsil hizmeti sunulmamaktadır.",
      detailedServices: [
        {
          title: "İş Sözleşmeleri ve Haklar",
          description:
            "Çalışan ve işveren hakları, sözleşme türleri ve iş yerinde uyulması gereken yasal prosedürler hakkında bilgilendirme yapıyorum.",
        },
        {
          title: "İşten Çıkarılma ve Tazminat",
          description:
            "Haksız işten çıkarılma, kıdem ve ihbar tazminatı gibi konularda danışmanlık ve süreç rehberliği sağlıyorum.",
        },
        {
          title: "Danışmanlık ve Sorular",
          description:
            "Her türlü iş hukuku sorusunu alıyor, adım adım çözüm önerileri sunuyorum.",
        },
      ],
      faq: [
        {
          question: "İşten çıkarıldım, haklarım nelerdir?",
          answer:
            "Kıdem ve ihbar tazminatı başta olmak üzere haklarınızı bilmek çok önemlidir. Süreç ve haklar hakkında detaylı bilgi için danışmanlık talep edebilirsiniz.",
        },
        {
          question: "Fazla mesai ücretim ödenmedi, ne yapmalıyım?",
          answer:
            "Fazla mesai hesaplamaları ve yasal haklarınızı açıklıyor, çözüm yollarını sunuyorum.",
        },
        {
          question: "İş sözleşmemi anlamıyorum, ne yapabilirim?",
          answer:
            "Sözleşmenizi adım adım inceleyerek haklarınızı ve yükümlülüklerinizi açıklayabilirim.",
        },
      ],
      examples: [
        {
          case: "Bir çalışan işten çıkarıldı ve tazminat haklarını bilmiyordu. Danışmanlık ile hakları açıklandı ve süreç planlandı.",
        },
        {
          case: "Fazla mesai ücreti konusunda anlaşmazlık yaşayan kişi, haklarını öğrenip işverenle doğru adımları atmak için danışmanlık aldı.",
        },
      ],
    },
    {
      icon: 'Home',
      title: "Medeni Hukuk Danışmanlığı",
      slug: "medeni-hukuk",
      description:
        "Medeni hukuk konularında bilgilendirme ve danışmanlık sağlıyorum. Miras, sözleşme ve taşınmaz işlemleri hakkında rehberlik sunuyorum.",
      services: [
        "Medeni hukuk süreçleri hakkında bilgilendirme",
        "Sözleşmeler, taşınmaz ve miras konularında rehberlik",
        "Hak ve yükümlülükler hakkında danışmanlık",
        "Hukuki sorulara yanıt ve çözüm önerileri",
      ],
      experience: "10+ yıl hukuk bilgisi ve danışmanlık deneyimi",
      detailTitle: "Medeni Hukuk Hakkında Detaylı Bilgilendirme",
      detailDescription:
        "Medeni hukuk alanında, miras, sözleşme, taşınmaz alım-satım ve aile hukuku konularında bilgilendirme yapıyorum. Henüz dava veya temsil hizmeti sunulmamaktadır.",
      detailedServices: [
        {
          title: "Sözleşmeler ve Taşınmaz İşlemleri",
          description:
            "Alım-satım, kiralama ve diğer taşınmaz işlemlerinde yasal süreçleri açıklıyorum.",
        },
        {
          title: "Miras ve Aile Hukuku",
          description:
            "Miras paylaşımı, vasiyet ve aile hukuku konularında bilgilendirme ve yönlendirme sağlıyorum.",
        },
        {
          title: "Danışmanlık ve Sorular",
          description:
            "Sorularınızı alıyor, her aşamada rehberlik sağlıyor ve hukuki çözüm yollarını anlatıyorum.",
        },
      ],
      faq: [
        {
          question: "Miras paylaşımı nasıl yapılır?",
          answer:
            "Miras paylaşımı ve yasal prosedürler hakkında detaylı bilgi veriyor, haklarınızı açıklıyorum.",
        },
        {
          question: "Taşınmaz alım-satımında nelere dikkat etmeliyim?",
          answer:
            "Tapu işlemleri, sözleşmeler ve olası riskler hakkında bilgilendirme sağlıyorum.",
        },
        {
          question: "Sözleşme hazırlarken nelere dikkat etmeliyim?",
          answer:
            "Sözleşmelerde hak ve yükümlülükleri adım adım açıklıyor, dikkat edilmesi gereken hususları belirtiyorum.",
        },
      ],
      examples: [
        {
          case: "Bir miras paylaşımı sürecinde danışan, haklarını ve yasal prosedürü öğrenerek bilinçli adımlar attı.",
        },
        {
          case: "Taşınmaz alım-satımında sözleşme hazırlamak isteyen kişi, riskler ve haklar konusunda danışmanlık aldı.",
        },
      ],
    },
  ],
  en: [
    {
      icon: "Gavel",
      title: "Criminal Law Consulting",
      slug: "criminal-law",
      description:
        "I provide information and consultancy services on criminal law. I offer comprehensive guidance about your rights and legal processes.",
      services: [
        "Information about criminal law procedures",
        "Explanation of rights and obligations",
        "Guidance on possible legal steps",
        "Answers and direction for legal questions",
      ],
      experience: "10+ years of legal knowledge and consulting experience",
      detailTitle: "Detailed Information on Criminal Law",
      detailDescription:
        "I provide detailed guidance on criminal law topics including detention, arrest, crime types, and potential legal processes. Active representation in cases is not provided.",
      detailedServices: [
        {
          title: "Criminal Law Procedures",
          description:
            "I explain in detail how detention, arrest, investigation, and prosecution processes work.",
        },
        {
          title: "Rights and Obligations",
          description:
            "I provide information about suspect and victim rights, defense rights, and legal procedures.",
        },
        {
          title: "Consulting and Questions",
          description:
            "I guide on all types of legal questions and explain alternative solutions.",
        },
      ],
      faq: [
        {
          question: "What should I do if I am detained?",
          answer:
            "Knowing your legal rights is very important. Verifying your identity, requesting a lawyer, and recording your statements are critical steps.",
        },
        {
          question: "How long does the detention process last?",
          answer:
            "The duration of detention depends on the nature of the case. I can provide detailed guidance on the process and rights.",
        },
        {
          question: "How can I ask questions about criminal law?",
          answer:
            "You can ask questions via phone or email to receive quick and accurate information.",
        },
      ],
      examples: [
        {
          case: "A person did not know their rights when detained. Step-by-step guidance was provided to explain the process and rights.",
        },
        {
          case: "A person seeking information about a criminal allegation was informed about the process steps and possible outcomes.",
        },
      ],
    },
    {
      icon: "Landmark",
      title: "Administrative Law Consulting",
      slug: "administrative-law",
      description:
        "I provide guidance and consultancy on administrative law, including administrative procedures, decisions, and your rights.",
      services: [
        "Information about administrative procedures and processes",
        "Explanation of rights and obligations",
        "Guidance on petitions, objections, and applications",
        "Answers and direction for legal questions",
      ],
      experience: "9+ years of legal knowledge and consulting experience",
      detailTitle: "Detailed Information on Administrative Law",
      detailDescription:
        "I provide detailed guidance on administrative decisions, procedures, and objection mechanisms. Active representation is not provided.",
      detailedServices: [
        {
          title: "Administrative Procedures and Decisions",
          description:
            "I provide detailed guidance on the decisions and actions taken by administrative bodies.",
        },
        {
          title: "Rights and Obligations",
          description:
            "I provide guidance on administrative rights, application, and objection procedures.",
        },
        {
          title: "Consulting and Q&A",
          description:
            "I answer questions and provide the most accurate guidance.",
        },
      ],
      faq: [
        {
          question: "How to file an administrative objection?",
          answer:
            "The duration, format, and content of objections are specified by law. I provide step-by-step guidance.",
        },
        {
          question: "What are my rights if my license is revoked?",
          answer:
            "Understanding your rights in case of license revocation is critical. Detailed guidance is available.",
        },
        {
          question: "How long do administrative processes take?",
          answer:
            "Process duration varies depending on the case. I provide follow-up and guidance.",
        },
      ],
      examples: [
        {
          case: "A person facing license revocation was informed about the process steps and legal rights.",
        },
        {
          case: "A person preparing an administrative application received guidance on necessary documents and the process.",
        },
      ],
    },
    {
      icon: "Building2",
      title: "Labor Law Consulting",
      slug: "labor-law",
      description:
        "I provide information and consultancy on labor law, including employment contracts, dismissals, and labor disputes.",
      services: [
        "Information on labor law processes and rights",
        "Guidance on employment contracts and dismissals",
        "Consultancy on labor disputes and claims",
        "Answers and solutions for legal questions",
      ],
      experience: "7+ years of legal knowledge and consulting experience",
      detailTitle: "Detailed Information on Labor Law",
      detailDescription:
        "I provide guidance on labor law topics, including employment contracts, dismissals, overtime, and compensation. Active representation is not provided.",
      detailedServices: [
        {
          title: "Employment Contracts and Rights",
          description:
            "I provide guidance on employee and employer rights, contract types, and legal procedures at work.",
        },
        {
          title: "Dismissals and Compensation",
          description:
            "I provide guidance on unfair dismissal, severance, and notice compensation.",
        },
        {
          title: "Consulting and Questions",
          description:
            "I answer all labor law questions and provide step-by-step solutions.",
        },
      ],
      faq: [
        {
          question: "I was dismissed. What are my rights?",
          answer:
            "Knowing your rights, especially severance and notice compensation, is very important. Guidance is available.",
        },
        {
          question: "My overtime pay was not paid. What should I do?",
          answer:
            "I provide calculations and legal options for unpaid overtime.",
        },
        {
          question: "I don't understand my employment contract. What can I do?",
          answer:
            "I review the contract step-by-step and explain your rights and obligations.",
        },
      ],
      examples: [
        {
          case: "An employee was dismissed without knowing their compensation rights. Guidance clarified their rights and planned the process.",
        },
        {
          case: "A person facing overtime payment issues received guidance on correct steps to take with the employer.",
        },
      ],
    },
    {
      icon: "Home",
      title: "Civil Law Consulting",
      slug: "civil-law",
      description:
        "I provide guidance on civil law, including inheritance, contracts, and real estate transactions.",
      services: [
        "Information on civil law procedures",
        "Guidance on contracts, real estate, and inheritance",
        "Advice on rights and obligations",
        "Answers and solutions for legal questions",
      ],
      experience: "10+ years of legal knowledge and consulting experience",
      detailTitle: "Detailed Information on Civil Law",
      detailDescription:
        "I provide guidance on inheritance, contracts, real estate transactions, and family law. Active representation is not provided.",
      detailedServices: [
        {
          title: "Contracts and Real Estate Transactions",
          description:
            "I explain legal procedures in buying, selling, and renting properties.",
        },
        {
          title: "Inheritance and Family Law",
          description:
            "I provide guidance on inheritance distribution, wills, and family law issues.",
        },
        {
          title: "Consulting and Questions",
          description:
            "I answer questions and guide clients at every stage with practical solutions.",
        },
      ],
      faq: [
        {
          question: "How is inheritance distributed?",
          answer:
            "I provide detailed guidance on inheritance and legal procedures.",
        },
        {
          question:
            "What should I pay attention to in real estate transactions?",
          answer:
            "I provide guidance on property procedures, contracts, and potential risks.",
        },
        {
          question: "What should I consider when preparing contracts?",
          answer:
            "I explain rights and obligations step-by-step and highlight key points.",
        },
      ],
      examples: [
        {
          case: "A client learned their rights and legal procedures during an inheritance process and acted consciously.",
        },
        {
          case: "A person preparing a property contract received guidance on risks and rights.",
        },
      ],
    },
  ],
};
