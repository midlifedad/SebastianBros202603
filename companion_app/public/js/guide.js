(function() {
  'use strict';

  const SECTION_MAP = [
    { key: 'ai_impact', label: 'AI Impact' },
    { key: 'ai_tools', label: 'Tools' },
    { key: 'agentic_frameworks', label: 'Agents & Frameworks' },
    { key: 'role_transformation', label: 'Role Transformation' },
    { key: 'learning_resources', label: 'Learn' },
    { key: 'industry_use_cases', label: 'Industry Cases' },
  ];

  // --- DOM References ---
  const loadingView = document.getElementById('loading-view');
  const guideView = document.getElementById('guide-view');
  const guidePhoto = document.getElementById('guide-photo');
  const guideName = document.getElementById('guide-name');
  const guideTitle = document.getElementById('guide-title');
  const sectionTabs = document.getElementById('section-tabs');
  const sectionContent = document.getElementById('section-content');

  // --- Error Display ---
  function showError(message) {
    loadingView.innerHTML = '<p class="error-msg">' + message + '</p>';
  }

  // --- Render Functions ---
  function renderHeader(attendee) {
    guidePhoto.src = utils.getProfileImage(attendee);
    guidePhoto.alt = attendee.name;
    guideName.textContent = attendee.name;
    guideTitle.textContent = attendee.title;
  }

  function renderTabs() {
    SECTION_MAP.forEach(function(section, index) {
      var btn = document.createElement('button');
      btn.className = 'tab-btn' + (index === 0 ? ' active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('data-section', section.key);
      btn.textContent = section.label;
      sectionTabs.appendChild(btn);
    });

    // Event delegation for tab clicks
    sectionTabs.addEventListener('click', function(e) {
      var btn = e.target.closest('.tab-btn');
      if (!btn) return;
      switchTab(btn.getAttribute('data-section'));
    });
  }

  function renderSections(sections) {
    SECTION_MAP.forEach(function(section, index) {
      var panel = document.createElement('div');
      panel.className = 'section-panel' + (index !== 0 ? ' hidden' : '');
      panel.setAttribute('data-section', section.key);
      panel.innerHTML = utils.renderMarkdown(sections[section.key] || '');
      sectionContent.appendChild(panel);
    });
  }

  function switchTab(sectionKey) {
    // Update tab buttons
    var tabs = sectionTabs.querySelectorAll('.tab-btn');
    tabs.forEach(function(tab) {
      if (tab.getAttribute('data-section') === sectionKey) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update panels
    var panels = sectionContent.querySelectorAll('.section-panel');
    panels.forEach(function(panel) {
      if (panel.getAttribute('data-section') === sectionKey) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    });

    // Scroll to top of content
    window.scrollTo(0, sectionTabs.offsetTop);
  }

  // --- Page Load ---
  function init() {
    if (!auth.token) return; // auth.js handles display

    var params = new URLSearchParams(location.search);
    var id = params.get('id');

    if (!id) {
      showError('No attendee specified');
      return;
    }

    auth.apiFetch('/api/attendee/' + id)
      .then(function(res) {
        if (res.status === 404) {
          showError('Attendee not found');
          return null;
        }
        if (!res.ok) {
          showError('Error loading profile');
          return null;
        }
        return res.json();
      })
      .then(function(attendee) {
        if (!attendee) return;

        renderHeader(attendee);
        renderTabs();
        renderSections(attendee.sections);

        // Set Poll tab link
        document.getElementById('tab-poll').href = auth.buildUrl('/poll.html');

        // Show guide, hide loading
        loadingView.classList.add('hidden');
        guideView.classList.remove('hidden');
        guideView.style.animation = 'fadeIn 0.3s ease-out';
      })
      .catch(function(err) {
        showError('Failed to load guide');
        console.error('Guide load error:', err);
      });
  }

  init();
})();
