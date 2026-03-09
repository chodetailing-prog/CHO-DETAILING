import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy,
  getDoc
} from "firebase/firestore";
import { db, auth } from "@/firebase";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string; // Main thumbnail
  images: string[]; // Gallery images
  date: string;
  description?: string;
  admin_key?: string; // For security rules validation
}

export interface PricingCategory {
  title: string;
  items: {
    label: string;
    price: string;
  }[];
}

export interface PricingPlan {
  title: string;
  price?: string;
  description?: string;
  features?: string[];
  categories?: PricingCategory[];
}

export interface Service {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  image: string;
  order: number;
  admin_key?: string;
  pricing?: PricingPlan[];
}

// Collection references
const portfolioCol = collection(db, "portfolio");
const servicesCol = collection(db, "services");
const configDoc = doc(db, "config", "main");

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const q = query(portfolioCol, orderBy("date", "desc"));
  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      delete data.admin_key; // Hide key from frontend
      return { ...data, id: doc.id } as PortfolioItem;
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, "portfolio");
    return [];
  }
}

export function subscribePortfolioItems(callback: (items: PortfolioItem[]) => void) {
  const q = query(portfolioCol, orderBy("date", "desc"));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map(doc => {
      const data = doc.data();
      delete data.admin_key; // Hide key from frontend
      return { ...data, id: doc.id } as PortfolioItem;
    });
    callback(items);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, "portfolio");
  });
}

export async function savePortfolioItem(item: PortfolioItem) {
  const itemDoc = doc(portfolioCol, item.id);
  await setDoc(itemDoc, { ...item, admin_key: "041018" });
}

export async function deletePortfolioItem(id: string) {
  const itemDoc = doc(portfolioCol, id);
  await deleteDoc(itemDoc);
}

export async function getServices(): Promise<Service[]> {
  try {
    const snapshot = await getDocs(servicesCol);
    const items = snapshot.docs.map(doc => {
      const data = doc.data();
      delete data.admin_key;
      return { ...data, id: doc.id } as Service;
    });
    // Sort in memory to handle documents without 'order' field
    return items.sort((a, b) => (a.order || 99) - (b.order || 99));
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, "services");
    return [];
  }
}

export function subscribeServices(callback: (items: Service[]) => void) {
  return onSnapshot(servicesCol, (snapshot) => {
    const items = snapshot.docs.map(doc => {
      const data = doc.data();
      delete data.admin_key;
      return { ...data, id: doc.id } as Service;
    });
    // Sort in memory to handle documents without 'order' field
    const sortedItems = items.sort((a, b) => (a.order || 99) - (b.order || 99));
    callback(sortedItems);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, "services");
  });
}

export async function saveService(service: Service) {
  const serviceDoc = doc(servicesCol, service.id);
  await setDoc(serviceDoc, { ...service, admin_key: "041018" });
}

export async function deleteService(id: string) {
  const serviceDoc = doc(servicesCol, id);
  await deleteDoc(serviceDoc);
}

export async function getServiceById(id: string): Promise<Service | null> {
  const serviceDoc = doc(servicesCol, id);
  const snapshot = await getDoc(serviceDoc);
  if (snapshot.exists()) {
    const data = snapshot.data();
    delete data.admin_key;
    return { ...data, id: snapshot.id } as Service;
  }
  return null;
}

export async function getHeroImage(): Promise<string> {
  const snapshot = await getDoc(configDoc);
  if (snapshot.exists()) {
    return snapshot.data().heroImage;
  }
  return "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop";
}

export async function saveHeroImage(url: string) {
  await setDoc(configDoc, { heroImage: url, admin_key: "041018" }, { merge: true });
}

export async function seedPortfolioItems() {
  const snapshot = await getDocs(portfolioCol);
  if (snapshot.empty) {
    const examples: PortfolioItem[] = [
      {
        id: "1",
        title: "Porsche 911 GT3 - Full Detail & Ceramic Coating",
        category: "Ceramic Coating",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1974&auto=format&fit=crop"
        ],
        date: "2024-03-01",
        description: "포르쉐 911 GT3 차량의 전체 디테일링 및 최상급 세라믹 코팅 시공 사례입니다. 도장면의 광택을 극대화하고 장기적인 보호를 위해 3레이어 코팅이 적용되었습니다."
      },
      {
        id: "2",
        title: "Mercedes-Benz G-Wagon - Interior Restoration",
        category: "Interior Detail",
        image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=2070&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop"
        ],
        date: "2024-02-15",
        description: "G-바겐 차량의 실내 가죽 복원 및 딥 클리닝 작업입니다. 세월의 흔적을 지우고 신차 수준의 실내 컨디션을 회복하는 데 중점을 두었습니다."
      },
      {
        id: "3",
        title: "BMW M4 - Paint Correction & PPF",
        category: "Paint Correction",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070&auto=format&fit=crop"
        ],
        date: "2024-01-20",
        description: "BMW M4 차량의 도장면 결함 제거(광택) 및 프론트 패키지 PPF 시공입니다. 스톤칩 방지와 깊은 색감 구현을 목표로 작업되었습니다."
      }
    ];

    for (const item of examples) {
      await savePortfolioItem(item);
    }
  }

  const servicesSnapshot = await getDocs(servicesCol);
  if (servicesSnapshot.empty) {
    const defaultServices: Service[] = [
      {
        id: "interior",
        title: "Interior Detailing",
        price: "From ₩150,000",
        description: "단순한 세차를 넘어 실내의 모든 오염 요소를 제거하고 신차 수준의 쾌적함을 복원합니다. 고온 스팀 살균과 천연 가죽 케어 시스템을 통해 보이지 않는 세균까지 완벽하게 케어합니다.",
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2000&auto=format&fit=crop",
        order: 1,
        features: [
          "고온 스팀 살균 및 틈새 정밀 세척",
          "프리미엄 가죽 클리닝 & 컨디셔닝 (PH 밸런스 케어)",
          "천장 및 바닥 카페트 딥 클리닝 (오염 및 얼룩 제거)",
          "실내 냄새 제거 및 오존 살균 탈취",
          "대시보드, 도어 트림 UV 보호제 도포",
          "에어컨 송풍구 정밀 클리닝"
        ],
        pricing: [
          {
            title: "인테리어 디테일링 (Deep Cleaning)",
            price: "별도 문의",
            description: "실내 전체 및 트렁크 공간에 대한 정밀 스팀 살균 세정 서비스입니다.",
            features: [
              "대시보드, 센터콘솔, 도어패널 정밀 세정",
              "가죽 시트 클리닝 및 컨디셔닝 (영양 공급)",
              "패브릭 시트 딥클리닝 (샴푸 추출 방식)",
              "바닥 매트 및 카페트 딥클리닝",
              "플라스틱 부품 UV 보호 및 드레싱",
              "유리 세정 (잔사 없는 투명함)"
            ]
          },
          {
            title: "오존 살균 탈취 (Ozone Treatment)",
            description: "실내의 불쾌한 냄새를 근본적으로 제거하는 살균 탈취 서비스입니다.",
            features: [
              "실내 악취 원인균 제거",
              "오존 가스를 이용한 구석구석 정밀 살균",
              "담배 냄새, 곰팡이 냄새 등 중화"
            ]
          }
        ]
      },
      {
        id: "paint",
        title: "Paint Correction",
        price: "From ₩600,000",
        description: "도장면의 스크래치, 스월마크, 워터스팟 등을 정밀하게 연마하여 신차 이상의 완벽한 도장 상태로 복원하는 광택 작업입니다.",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000&auto=format&fit=crop",
        order: 2,
        features: [
          "정밀 마스킹 및 전처리",
          "수성 광택 (1~3 Step)",
          "홀로그램 및 스월마크 완벽 제거",
          "도장면 탈지 및 검수",
          "프리미엄 실런트 코팅"
        ],
        pricing: [
          {
            title: "라이트 폴리싱 (Light Polish)",
            description: "매우 미세한 스크래치를 제거하고 도장면의 광택을 최대로 끌어올리는 1단계 광택 공정입니다.",
            categories: [
              {
                title: "차종별 추가 비용",
                items: [
                  { label: "세단 / 스테이션 왜건", price: "+ ₩150,000" },
                  { label: "지프 / SUV", price: "+ ₩220,000" }
                ]
              }
            ]
          },
          {
            title: "헤비 폴리싱 (Heavy Polish)",
            description: "중간 정도에서 깊은 스크래치, 스월마크, 산화물 등을 제거하여 완벽한 도장 상태를 복원하는 다단계 광택 공정입니다.",
            categories: [
              {
                title: "차종별 추가 비용",
                items: [
                  { label: "세단 / 스테이션 왜건", price: "+ ₩300,000" },
                  { label: "지프 / SUV", price: "+ ₩450,000" }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "ceramic",
        title: "Ceramic Coating",
        price: "From ₩800,000",
        description: "최상급 세라믹 코팅제를 도포하여 도장면을 보호하고, 강력한 발수력과 방오성을 부여하여 차량 관리를 수월하게 합니다.",
        image: "https://images.unsplash.com/photo-1552689486-f6773047d19f?q=80&w=2000&auto=format&fit=crop",
        order: 3,
        features: [
          "Paint Correction 공정 포함",
          "9H 경도 프리미엄 세라믹 코팅",
          "휠 및 캘리퍼 코팅",
          "유리 전체 발수 코팅",
          "플라스틱 트림 코팅"
        ],
        pricing: [
          {
            title: "신차 코팅 패키지 (New Car Package)",
            description: "신차 출고 시 최상의 상태를 영구적으로 보존하기 위한 프리미엄 보호 패키지입니다.",
            features: [
              "정밀 디테일링 세차 및 탈지",
              "도장면 정밀 검수",
              "프라이머 폴리싱 (광택 증진)",
              "최상급 세라믹 코팅 2레이어 시공",
              "적외선 열처리 경과 공정"
            ],
            categories: [
              {
                title: "차종별 추가 비용",
                items: [
                  { label: "세단 / 스테이션 왜건", price: "+ ₩220,000" },
                  { label: "지프 / SUV", price: "+ ₩450,000" }
                ]
              }
            ]
          },
          {
            title: "세라믹 코팅 패키지 (Standard Package)",
            description: "기존 차량의 도장면을 복원한 후 강력한 보호막을 형성하는 패키지입니다.",
            features: [
              "클레이바 및 디컨타미네이션",
              "다단계 머신 폴리싱 (도장면 복원)",
              "최상급 세라믹 코팅 2레이어 시공",
              "적외선 열처리 경과 공정"
            ],
            categories: [
              {
                title: "차종별 추가 비용",
                items: [
                  { label: "세단 / 스테이션 왜건", price: "+ ₩220,000" },
                  { label: "지프 / SUV", price: "+ ₩450,000" }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "signature",
        title: "Premium Hand Wash",
        price: "From ₩250,000",
        description: "차량 내/외부의 오염을 안전하게 제거하고 본연의 색감과 광택을 끌어올리는 프리미엄 세차 서비스입니다.",
        image: "https://images.unsplash.com/photo-1601362840469-82e058f82400?q=80&w=2000&auto=format&fit=crop",
        order: 4,
        features: [
          "프리워시 및 스노우폼 세차",
          "철분 및 타르 제거",
          "프리미엄 카나우바 왁스 코팅",
          "실내 진공 청소 및 가죽 클리닝",
          "엔진룸 기본 클리닝"
        ],
        pricing: [
          {
            title: "프리미엄 핸드워시 (Premium Hand Wash)",
            price: "₩95,000",
            features: [
              "2버킷 방식의 안전한 미트질",
              "도어 힌지 및 틈새 정밀 세정",
              "휠, 타이어, 휠하우스 클리닝",
              "에어 드라잉 및 극세사 타월 건조",
              "스프레이 왁스 또는 실런트 코팅",
              "타이어 드레싱"
            ]
          },
          {
            title: "프리미엄 핸드워시 + 베이직 인테리어",
            price: "₩175,000",
            features: [
              "프리미엄 핸드워시 모든 공정 포함",
              "실내 진공 청소 및 먼지 제거",
              "유리 및 거울 정밀 세정"
            ]
          },
          {
            title: "디컨타미네이션 핸드워시",
            price: "₩125,000",
            features: [
              "프리미엄 핸드워시 모든 공정 포함",
              "타르 및 철분 제거 (낙진 제거)",
              "클레이바 작업 (필요 시)"
            ]
          }
        ]
      }
    ];

    for (const service of defaultServices) {
      await saveService(service);
    }
  } else {
    // Even if not empty, ensure the specific new ones are there with correct order
    const defaultServices: Service[] = [
      {
        id: "interior",
        title: "Interior Detailing",
        price: "From ₩150,000",
        description: "단순한 세차를 넘어 실내의 모든 오염 요소를 제거하고 신차 수준의 쾌적함을 복원합니다. 고온 스팀 살균과 천연 가죽 케어 시스템을 통해 보이지 않는 세균까지 완벽하게 케어합니다.",
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2000&auto=format&fit=crop",
        order: 1,
        features: [
          "고온 스팀 살균 및 틈새 정밀 세척",
          "프리미엄 가죽 클리닝 & 컨디셔닝 (PH 밸런스 케어)",
          "천장 및 바닥 카페트 딥 클리닝 (오염 및 얼룩 제거)",
          "실내 냄새 제거 및 오존 살균 탈취",
          "대시보드, 도어 트림 UV 보호제 도포",
          "에어컨 송풍구 정밀 클리닝"
        ],
        pricing: [
          {
            title: "인테리어 디테일링 (Deep Cleaning)",
            price: "별도 문의",
            description: "실내 전체 및 트렁크 공간에 대한 정밀 스팀 살균 세정 서비스입니다.",
            features: [
              "대시보드, 센터콘솔, 도어패널 정밀 세정",
              "가죽 시트 클리닝 및 컨디셔닝 (영양 공급)",
              "패브릭 시트 딥클리닝 (샴푸 추출 방식)",
              "바닥 매트 및 카페트 딥클리닝",
              "플라스틱 부품 UV 보호 및 드레싱",
              "유리 세정 (잔사 없는 투명함)"
            ]
          },
          {
            title: "오존 살균 탈취 (Ozone Treatment)",
            description: "실내의 불쾌한 냄새를 근본적으로 제거하는 살균 탈취 서비스입니다.",
            features: [
              "실내 악취 원인균 제거",
              "오존 가스를 이용한 구석구석 정밀 살균",
              "담배 냄새, 곰팡이 냄새 등 중화"
            ]
          }
        ]
      },
      {
        id: "paint",
        title: "Paint Correction",
        price: "From ₩600,000",
        description: "도장면의 스크래치, 스월마크, 워터스팟 등을 정밀하게 연마하여 신차 이상의 완벽한 도장 상태로 복원하는 광택 작업입니다.",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000&auto=format&fit=crop",
        order: 2,
        features: [
          "정밀 마스킹 및 전처리",
          "수성 광택 (1~3 Step)",
          "홀로그램 및 스월마크 완벽 제거",
          "도장면 탈지 및 검수",
          "프리미엄 실런트 코팅"
        ],
        pricing: [
          {
            title: "라이트 폴리싱 (Light Polish)",
            description: "매우 미세한 스크래치를 제거하고 도장면의 광택을 최대로 끌어올리는 1단계 광택 공정입니다.",
            categories: [
              {
                title: "차종별 추가 비용",
                items: [
                  { label: "세단 / 스테이션 왜건", price: "+ ₩150,000" },
                  { label: "지프 / SUV", price: "+ ₩220,000" }
                ]
              }
            ]
          },
          {
            title: "헤비 폴리싱 (Heavy Polish)",
            description: "중간 정도에서 깊은 스크래치, 스월마크, 산화물 등을 제거하여 완벽한 도장 상태를 복원하는 다단계 광택 공정입니다.",
            categories: [
              {
                title: "차종별 추가 비용",
                items: [
                  { label: "세단 / 스테이션 왜건", price: "+ ₩300,000" },
                  { label: "지프 / SUV", price: "+ ₩450,000" }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "ceramic",
        title: "Ceramic Coating",
        price: "From ₩800,000",
        description: "최상급 세라믹 코팅제를 도포하여 도장면을 보호하고, 강력한 발수력과 방오성을 부여하여 차량 관리를 수월하게 합니다.",
        image: "https://images.unsplash.com/photo-1552689486-f6773047d19f?q=80&w=2000&auto=format&fit=crop",
        order: 3,
        features: [
          "Paint Correction 공정 포함",
          "9H 경도 프리미엄 세라믹 코팅",
          "휠 및 캘리퍼 코팅",
          "유리 전체 발수 코팅",
          "플라스틱 트림 코팅"
        ],
        pricing: [
          {
            title: "신차 코팅 패키지 (New Car Package)",
            description: "신차 출고 시 최상의 상태를 영구적으로 보존하기 위한 프리미엄 보호 패키지입니다.",
            features: [
              "정밀 디테일링 세차 및 탈지",
              "도장면 정밀 검수",
              "프라이머 폴리싱 (광택 증진)",
              "최상급 세라믹 코팅 2레이어 시공",
              "적외선 열처리 경과 공정"
            ],
            categories: [
              {
                title: "차종별 추가 비용",
                items: [
                  { label: "세단 / 스테이션 왜건", price: "+ ₩220,000" },
                  { label: "지프 / SUV", price: "+ ₩450,000" }
                ]
              }
            ]
          },
          {
            title: "세라믹 코팅 패키지 (Standard Package)",
            description: "기존 차량의 도장면을 복원한 후 강력한 보호막을 형성하는 패키지입니다.",
            features: [
              "클레이바 및 디컨타미네이션",
              "다단계 머신 폴리싱 (도장면 복원)",
              "최상급 세라믹 코팅 2레이어 시공",
              "적외선 열처리 경과 공정"
            ],
            categories: [
              {
                title: "차종별 추가 비용",
                items: [
                  { label: "세단 / 스테이션 왜건", price: "+ ₩220,000" },
                  { label: "지프 / SUV", price: "+ ₩450,000" }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "signature",
        title: "Premium Hand Wash",
        price: "From ₩250,000",
        description: "차량 내/외부의 오염을 안전하게 제거하고 본연의 색감과 광택을 끌어올리는 프리미엄 세차 서비스입니다.",
        image: "https://images.unsplash.com/photo-1601362840469-82e058f82400?q=80&w=2000&auto=format&fit=crop",
        order: 4,
        features: [
          "프리워시 및 스노우폼 세차",
          "철분 및 타르 제거",
          "프리미엄 카나우바 왁스 코팅",
          "실내 진공 청소 및 가죽 클리닝",
          "엔진룸 기본 클리닝"
        ],
        pricing: [
          {
            title: "프리미엄 핸드워시 (Premium Hand Wash)",
            price: "₩95,000",
            features: [
              "2버킷 방식의 안전한 미트질",
              "도어 힌지 및 틈새 정밀 세정",
              "휠, 타이어, 휠하우스 클리닝",
              "에어 드라잉 및 극세사 타월 건조",
              "스프레이 왁스 또는 실런트 코팅",
              "타이어 드레싱"
            ]
          },
          {
            title: "프리미엄 핸드워시 + 베이직 인테리어",
            price: "₩175,000",
            features: [
              "프리미엄 핸드워시 모든 공정 포함",
              "실내 진공 청소 및 먼지 제거",
              "유리 및 거울 정밀 세정"
            ]
          },
          {
            title: "디컨타미네이션 핸드워시",
            price: "₩125,000",
            features: [
              "프리미엄 핸드워시 모든 공정 포함",
              "타르 및 철분 제거 (낙진 제거)",
              "클레이바 작업 (필요 시)"
            ]
          }
        ]
      }
    ];
    for (const service of defaultServices) {
      await saveService(service);
    }
  }
}

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

