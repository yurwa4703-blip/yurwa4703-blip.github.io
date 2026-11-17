const projects = {
  project1: { title: '금연 · 포스터 디자인', image: 'img/p1.jpg', tools: 'Photoshop · Illustrator', overview: '흡연하시는 분들을 위한 금연 포스터 입니다.' },
  project2: { title: '서브웨이 · 카드뉴스', image: 'img/p2.jpg', tools: 'Photoshop · Illustrator', overview: '서브웨이 카드뉴스 입니다.' },
  project3: { title: '빙그레 우유 · SNS 배너', image: 'img/p3.jpg', tools: 'Photoshop · Illustrator', overview: '빙그레 딸기우유 SNS Banner 입니다.' },
  project4: { title: '제네시스 차량 ·광고 영상', image: 'img/p4.jpg', tools: 'Premiere Pro', overview: '제네시스 차량 광고 영상을 AI로 만들었습니다.', video: 'https://drive.google.com/file/d/1QV7EsXQpxQ2bMOq7_GbnEOoszj3em9eO/view?usp=drive_link' },
  project5: { title: '리더스오토플랜 · 상세페이지', image: 'img/p5.jpg', tools: 'Photoshop · Figma', overview: '리더스오토플랜 회사의 상세페이지 입니다.' },
  project6: { title: '몬스터에너지 드링크 · 브랜드 프로모션 광고', image: 'img/p9.jpg', tools: 'Premiere Pro · After Effects', overview: '몬스터에너지드링크 바탕으로 제작한 광고영상 입니다.', video: 'https://drive.google.com/file/d/1_lWxwkwbeqaux_69dyOBdfLJ-wbXw_EC/view?usp=drive_link' },
  project7: { title: '나이키 · 웹사이트 디자인', image: 'img/p7.jpg?v=3', website: 'space-studio.html', tools: 'Figma · HTML/CSS', overview: '나이키 웹사이트 입니다.' },
  project8: { title: '모터로그 · UI/UX 앱 디자인', image: 'img/p8.jpg', tools: 'Figma · Photoshop', overview: '중고차 판매 앱입니다. 자동차 판매부터 상담까지 사용자의 흐름과 화면을 설계했습니다.' },
  project9: { title: '딸기라떼 · 카페 포스터 디자인', image: 'img/p6.jpg', tools: 'Photoshop', overview: '카페에 있는 딸기라떼 포스터 입니다.' }
};
function getDrivePreviewUrl(url) {
  const match = String(url).match(/\/file\/d\/([^/?]+)/);

  if (!match) return "";

  return `https://drive.google.com/file/d/${match[1]}/preview`;
}

function openModal(projectId) {
  const project = projects[projectId];
  if (!project) return;
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  modal.querySelectorAll('video').forEach(video => video.pause());
  modalBody.innerHTML = `
    <div class="project-intro">
      <p class="project-note">FICTIONAL PROJECT · 프로젝트</p>
      <h2>${project.title}</h2>
      <p>${project.overview}</p>
      <p class="project-tools">제작 도구: ${project.tools}</p>
      ${projectId === 'project7' ? `<div class="project-actions">
        ${project.website ? `<a class="btn" href="${project.website}" target="_blank" rel="noopener noreferrer">웹사이트 보기</a>` : '<button type="button" class="btn" disabled>웹사이트 보기 · 주소 연결 예정</button>'}
      </div>` : ''}
      ${project.video ? `<div class="project-actions" aria-label="프로젝트 보기 선택">
        <button type="button" class="btn" id="detail-view-button" aria-pressed="true" onclick="showProjectView('detail')">상세페이지 보기</button>
        <button type="button" class="btn" id="video-view-button" aria-pressed="false" onclick="showProjectView('video')">영상 보기</button>
      </div>` : ''}
    </div>
    <div id="project-detail-view">
      <img src="${project.image}" alt="${project.title} 프로젝트 상세 디자인" class="project-detail-image">
    </div>
    ${project.video ? `<div id="project-video-view" class="video-modal-container" hidden>
      <iframe src="" data-src="${getDrivePreviewUrl(project.video)}"
      width="100%"
      height="450"
      allow="autoplay; encrypted-media; fullscreen"
      allowfullscreen
      style="border: 0;">
      </iframe>

    </div>` : ''}
    <div class="modal-btn-wrap"><button class="modal-close-btn" onclick="closeModal()">닫기</button></div>
  `;
  modal.classList.add('active');
  modal.querySelector('.modal-content').scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function showProjectView(view) {
  const detail = document.getElementById('project-detail-view');
  const video = document.getElementById('project-video-view');

  if (!detail || !video) return;

  const showVideo = view === 'video';
  const frame = video.querySelector('iframe');

  detail.hidden = showVideo;
  video.hidden = !showVideo;

  document.getElementById('detail-view-button')
    .setAttribute('aria-pressed', String(!showVideo));

  document.getElementById('video-view-button')
    .setAttribute('aria-pressed', String(showVideo));

  if (frame) {
    frame.src = showVideo ? frame.dataset.src : 'about:blank';
  }
}


function closeModal() {
  const modal = document.getElementById('modal');

  modal.querySelectorAll('iframe').forEach(frame => {
    frame.src = 'about:blank';
  });

  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function closeModalOnOutside(event) {
  if (event.target.id === 'modal') {
    closeModal();
  }
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

const backToTopBtn = document.getElementById("backToTop");
window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

backToTopBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};