import { motion } from "motion/react";
import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-16">
          Privacy Policy
        </h1>

        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight border-b border-black/10 pb-4">우리는 누구인가</h2>
            <p className="text-lg font-light leading-relaxed">
              저희 웹사이트 주소는 <a href="https://chodetailing.netlify.app/" className="underline hover:text-black/70 transition-colors">https://chodetailing.netlify.app/</a> 입니다.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight border-b border-black/10 pb-4">댓글</h2>
            <div className="text-lg font-light leading-relaxed space-y-4">
              <p>
                방문자가 사이트에 댓글을 남길 때, 저희는 댓글 양식에 표시된 데이터와 스팸 감지를 돕기 위해 방문자의 IP 주소 및 브라우저 사용자 에이전트 문자열을 수집합니다.
              </p>
              <p>
                귀하의 이메일 주소로부터 생성된 익명화된 문자열(해시)이 Gravatar 서비스에 제공되어 귀하가 해당 서비스를 사용 중인지 확인할 수 있습니다. Gravatar 서비스의 개인정보 보호정책은 <a href="https://automattic.com/privacy/" target="_blank" rel="noopener noreferrer" className="underline">여기</a>에서 확인하실 수 있습니다. 댓글이 승인되면 귀하의 프로필 사진이 댓글과 함께 공개적으로 표시됩니다.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight border-b border-black/10 pb-4">미디어</h2>
            <p className="text-lg font-light leading-relaxed">
              웹사이트에 이미지를 업로드하실 경우, 위치 정보(EXIF GPS)가 포함된 이미지는 업로드하지 않는 것이 좋습니다. 사이트 방문자가 웹사이트의 이미지에서 위치 정보를 다운로드하고 추출할 수 있기 때문입니다.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight border-b border-black/10 pb-4">쿠키 (Cookies)</h2>
            <div className="text-lg font-light leading-relaxed space-y-4">
              <p>
                저희 사이트에 댓글을 남기실 때 이름, 이메일 주소, 웹사이트 정보를 쿠키에 저장하도록 선택하실 수 있습니다. 이는 다음 댓글 작성 시 정보를 다시 입력해야 하는 번거로움을 덜어드리기 위한 편의 기능이며, 이 쿠키는 1년간 유지됩니다.
              </p>
              <p>
                로그인 페이지를 방문하시면 브라우저의 쿠키 허용 여부를 확인하기 위해 임시 쿠키를 설정합니다. 이 쿠키는 개인정보를 포함하지 않으며 브라우저를 닫으면 즉시 삭제됩니다.
              </p>
              <p>
                로그인 시에는 로그인 정보와 화면 표시 설정을 저장하기 위해 여러 개의 쿠키가 설정됩니다. 로그인 쿠키는 2일, 화면 설정 쿠키는 1년간 유지됩니다. "로그인 유지"를 선택하시면 로그인 상태가 2주간 지속되며, 로그아웃 시 로그인 쿠키는 삭제됩니다.
              </p>
              <p>
                게시글을 수정하거나 발행할 경우 추가 쿠키가 브라우저에 저장됩니다. 이 쿠키는 개인정보를 포함하지 않고 수정 중인 게시글의 ID만 포함하며, 1일 후 만료됩니다.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight border-b border-black/10 pb-4">타 사이트로부터의 임베디드 콘텐츠</h2>
            <div className="text-lg font-light leading-relaxed space-y-4">
              <p>
                본 사이트의 게시물에는 동영상, 이미지, 기사 등 외부 사이트의 임베디드 콘텐츠가 포함될 수 있습니다. 이러한 콘텐츠는 방문자가 해당 외부 웹사이트를 직접 방문한 것과 동일하게 작동합니다.
              </p>
              <p>
                해당 웹사이트들은 귀하에 대한 데이터를 수집하고 쿠키를 사용하며, 제3자 추적 기능을 삽입하여 귀하와 임베디드 콘텐츠 간의 상호작용을 모니터링할 수 있습니다. 특히 귀하가 해당 웹사이트에 계정이 있고 로그인한 상태라면 상호작용 추적이 더욱 정밀하게 이루어질 수 있습니다.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight border-b border-black/10 pb-4">데이터 공유 대상</h2>
            <p className="text-lg font-light leading-relaxed">
              비밀번호 재설정을 요청하시는 경우, 재설정 이메일에 귀하의 IP 주소가 포함됩니다.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight border-b border-black/10 pb-4">데이터 보관 기간</h2>
            <div className="text-lg font-light leading-relaxed space-y-4">
              <p>
                댓글을 남기시면 해당 댓글과 메타데이터는 영구적으로 보존됩니다. 이는 후속 댓글을 자동으로 인식하고 승인하여 검토 대기열에 머물지 않도록 하기 위함입니다.
              </p>
              <p>
                저희 사이트에 가입하는 사용자의 경우, 사용자 프로필에 제공된 개인정보를 저장합니다. 모든 사용자는 언제든지 자신의 개인정보를 조회, 수정 또는 삭제할 수 있습니다(사용자 이름 제외). 사이트 관리자 또한 해당 정보를 조회하고 수정할 수 있습니다.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight border-b border-black/10 pb-4">데이터에 대한 귀하의 권리</h2>
            <p className="text-lg font-light leading-relaxed">
              본 사이트에 계정이 있거나 댓글을 남긴 경우, 당사가 보유한 귀하의 개인 데이터(제공하신 모든 데이터 포함)를 파일 형태로 내보내도록 요청하실 수 있습니다. 또한 당사가 보유한 귀하의 개인 데이터를 삭제하도록 요청하실 수도 있습니다. 다만 행정적, 법적 또는 보안상의 이유로 보관해야 하는 데이터는 삭제 대상에서 제외됩니다.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight border-b border-black/10 pb-4">데이터 전송 위치</h2>
            <p className="text-lg font-light leading-relaxed">
              방문자의 댓글은 자동 스팸 감지 서비스를 통해 검토될 수 있습니다.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
