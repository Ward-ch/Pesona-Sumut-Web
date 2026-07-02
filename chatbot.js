/* ============================================
   CHATBOT ENGINE - Pesona Sumut
   Rule-based chatbot untuk wisata Sumatera Utara
   ============================================ */

(function () {
  'use strict';

  // ---- Knowledge Base ----
  const knowledgeBase = [
    {
      keywords: ['halo', 'hai', 'hi', 'hey', 'hello', 'selamat', 'pagi', 'siang', 'sore', 'malam', 'assalamualaikum'],
      response: 'Halo! 👋 Selamat datang di Pesona Sumut. Saya siap membantu kamu merencanakan liburan seru di Sumatera Utara! Ada yang bisa dibantu?',
      quickReplies: ['Wisata populer', 'Info tiket', 'Kuliner khas', 'Penginapan']
    },
    {
      keywords: ['danau toba', 'toba', 'samosir'],
      response: '🌊 <b>Danau Toba</b> adalah danau vulkanik terbesar di dunia! Terletak di Kabupaten Toba Samosir.\n\n📍 Aktivitas seru:\n• Berenang & berperahu\n• Mengunjungi Pulau Samosir\n• Menikmati pemandangan dari Bukit Indah Simarjarunjung\n\n💰 Tiket masuk: mulai Rp10.000',
      quickReplies: ['Penginapan Toba', 'Kuliner Toba', 'Wisata lain']
    },
    {
      keywords: ['berastagi', 'brastagi', 'sibayak', 'sinabung', 'karo'],
      response: '🌿 <b>Berastagi</b> adalah kota wisata sejuk di Tanah Karo!\n\n📍 Destinasi populer:\n• Gunung Sibayak (trekking ringan)\n• Pemandian Air Panas Pariban\n• Pasar Buah Berastagi\n• Gundaling Hill\n\n🌡️ Suhu: 16-25°C, sangat sejuk!',
      quickReplies: ['Info Pariban', 'Kuliner Karo', 'Wisata lain']
    },
    {
      keywords: ['pariban', 'pemandian', 'air panas'],
      response: '♨️ <b>Pemandian Air Panas Pariban</b>\n\nTerletak di kaki Gunung Sibayak, menawarkan kolam renang bertingkat dengan suhu berbeda-beda.\n\n📍 Alamat: Desa Semangat Gunung, Kec. Berastagi, Kab. Karo\n⏰ Jam Buka: 24 jam setiap hari\n💰 Tiket: Dewasa Rp20.000 | Anak Rp10.000',
      quickReplies: ['Wisata Berastagi', 'Wisata lain', 'Kuliner khas']
    },
    {
      keywords: ['bukit lawang', 'orangutan', 'langkat'],
      response: '🦧 <b>Bukit Lawang</b> adalah pusat rehabilitasi orangutan Sumatera!\n\n📍 Terletak di Kabupaten Langkat.\n• Trekking di hutan hujan tropis\n• Melihat orangutan liar\n• River tubing di Sungai Bohorok\n\n💰 Tiket: mulai Rp5.000 (belum termasuk guide)',
      quickReplies: ['Wisata alam lain', 'Info penginapan', 'Kuliner khas']
    },
    {
      keywords: ['tjong a fie', 'tjong', 'bersejarah', 'medan kota', 'heritage'],
      response: '🏛️ <b>Rumah Tjong A Fie</b>\n\nBangunan bersejarah bergaya Tiongkok-Melayu di pusat kota Medan.\n\n📍 Jl. Jend. Ahmad Yani No.105, Medan\n⏰ Jam Buka: 09.00-17.00 WIB\n💰 Tiket: Rp35.000\n\nMuseum ini menyimpan koleksi perabot & foto bersejarah dari era kolonial.',
      quickReplies: ['Wisata Medan', 'Kuliner Medan', 'Wisata lain']
    },
    {
      keywords: ['wisata', 'destinasi', 'tempat', 'liburan', 'jalan-jalan', 'populer', 'rekomendasi'],
      response: '🗺️ <b>Destinasi Populer Sumatera Utara:</b>\n\n1. 🌊 Danau Toba & Pulau Samosir\n2. 🌿 Berastagi & Gunung Sibayak\n3. 🦧 Bukit Lawang\n4. 🏛️ Rumah Tjong A Fie\n5. ♨️ Pemandian Air Panas Pariban\n6. 🌴 Pantai Pandan, Tapanuli\n7. 🏔️ Air Terjun Sipiso-piso\n\nMau tahu detail mana?',
      quickReplies: ['Danau Toba', 'Berastagi', 'Bukit Lawang', 'Info tiket']
    },
    {
      keywords: ['tiket', 'harga', 'biaya', 'tarif', 'htm', 'masuk'],
      response: '💰 <b>Info Harga Tiket Wisata:</b>\n\n• Danau Toba: mulai Rp10.000\n• Pemandian Pariban: Rp20.000 (dewasa)\n• Bukit Lawang: mulai Rp5.000\n• Rumah Tjong A Fie: Rp35.000\n• Sipiso-piso: Rp5.000\n\n*Harga dapat berubah sewaktu-waktu.',
      quickReplies: ['Promo weekend', 'Paket keluarga', 'Wisata populer']
    },
    {
      keywords: ['kuliner', 'makanan', 'makan', 'khas', 'food'],
      response: '🍽️ <b>Kuliner Khas Sumatera Utara:</b>\n\n• 🥘 Babi Panggang Karo (BPK)\n• 🍲 Saksang & Arsik\n• 🍜 Mie Gomak\n• 🥤 Tuak (minuman tradisional)\n• 🧆 Nasi Goreng Kwetiau Medan\n• 🍰 Bika Ambon\n• ☕ Kopi Sidikalang\n\nWajib coba semua! 😋',
      quickReplies: ['Wisata populer', 'Info tiket', 'Penginapan']
    },
    {
      keywords: ['hotel', 'penginapan', 'inap', 'resort', 'hostel', 'villa'],
      response: '🏨 <b>Rekomendasi Penginapan:</b>\n\n📍 <b>Medan:</b>\n• Hotel Grand Aston (⭐⭐⭐⭐)\n• JW Marriott Hotel\n\n📍 <b>Danau Toba:</b>\n• Toba Village Inn\n• Samosir Villa Resort\n\n📍 <b>Berastagi:</b>\n• Grand Mutiara Hotel\n• Sinabung Hills Resort\n\nBudget mulai Rp150.000 - Rp1.500.000/malam',
      quickReplies: ['Wisata populer', 'Kuliner khas', 'Info tiket']
    },
    {
      keywords: ['promo', 'diskon', 'weekend', 'murah'],
      response: '🎉 <b>Promo Spesial Pesona Sumut:</b>\n\n🔥 Promo Weekend: Diskon 20% tiket wisata\n👨‍👩‍👧‍👦 Paket Keluarga: Hemat hingga 30%\n📦 Bundle Paket: Wisata + Penginapan + Kuliner\n\nHubungi kami untuk info lengkap promo terbaru!',
      quickReplies: ['Paket keluarga', 'Wisata populer', 'Hubungi kami']
    },
    {
      keywords: ['paket', 'keluarga', 'bundle', 'tour'],
      response: '👨‍👩‍👧‍👦 <b>Paket Tour Keluarga:</b>\n\n📦 <b>Paket Toba (3H2M):</b>\nMedan → Parapat → Samosir → Medan\n💰 Mulai Rp1.200.000/orang\n\n📦 <b>Paket Karo (2H1M):</b>\nMedan → Berastagi → Sibayak → Medan\n💰 Mulai Rp800.000/orang\n\nTermasuk: transport + penginapan + makan',
      quickReplies: ['Info tiket', 'Hubungi kami', 'Wisata populer']
    },
    {
      keywords: ['kontak', 'hubungi', 'contact', 'email', 'telepon', 'telp', 'wa', 'whatsapp'],
      response: '📞 <b>Hubungi Kami:</b>\n\n📧 Email: edward@gmail.com\n🌐 Website: pesonasumut.id\n📍 Kantor: Medan, Sumatera Utara\n\nKami siap membantu merencanakan liburan terbaik kamu! 😊',
      quickReplies: ['Wisata populer', 'Kuliner khas', 'Info tiket']
    },
    {
      keywords: ['sipiso', 'air terjun', 'waterfall'],
      response: '💦 <b>Air Terjun Sipiso-piso</b>\n\nSalah satu air terjun tertinggi di Indonesia (120 meter)!\n\n📍 Desa Tongging, Kab. Karo\n⏰ Buka: 08.00-17.00 WIB\n💰 Tiket: Rp5.000\n\nPemandangan spektakuler dengan latar Danau Toba! 🏔️',
      quickReplies: ['Danau Toba', 'Berastagi', 'Wisata lain']
    },
    {
      keywords: ['terima kasih', 'thanks', 'makasih', 'trims', 'tq'],
      response: 'Sama-sama! 😊 Senang bisa membantu. Semoga liburan di Sumatera Utara menyenangkan ya! Jangan ragu bertanya lagi. Horas! 🙌',
      quickReplies: ['Wisata populer', 'Kuliner khas', 'Hubungi kami']
    },
    {
      keywords: ['horas'],
      response: 'Horas! 🙌 Itulah sapaan khas Batak! Selamat datang di Pesona Sumut. Mau jelajahi wisata apa hari ini?',
      quickReplies: ['Wisata populer', 'Danau Toba', 'Kuliner khas']
    }
  ];

  const fallbackResponses = [
    'Hmm, saya belum paham pertanyaan itu 🤔 Coba tanyakan tentang wisata, kuliner, atau tiket di Sumatera Utara ya!',
    'Maaf, saya belum bisa menjawab itu. Tapi saya tahu banyak tentang wisata Sumut! Coba kata kunci seperti "Danau Toba", "kuliner", atau "tiket" 😊',
    'Wah, pertanyaan menarik! Sayangnya saya hanya bisa bantu soal wisata Sumatera Utara. Coba tanya tentang destinasi, harga tiket, atau kuliner khas ya! 🗺️'
  ];

  // ---- Inject HTML ----
  function injectChatbotHTML() {
    const chatbotHTML = `
      <!-- Chatbot Toggle Button -->
      <button id="chatbot-toggle" aria-label="Buka chatbot">
        <svg class="icon-chat" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-3 12H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z"/>
        </svg>
        <svg class="icon-close" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
        <span id="chatbot-badge">1</span>
      </button>

      <!-- Chat Window -->
      <div id="chatbot-window" role="dialog" aria-label="Chatbot Pesona Sumut">
        <div class="chatbot-header">
          <div class="chatbot-avatar">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div class="chatbot-header-info">
            <h4>Pesona Sumut Bot</h4>
            <span>Online sekarang</span>
          </div>
        </div>

        <div class="chatbot-messages" id="chatbot-messages"></div>

        <div class="chatbot-input">
          <input type="text" id="chatbot-input-field" placeholder="Ketik pertanyaan..." autocomplete="off">
          <button id="chatbot-send-btn" aria-label="Kirim pesan">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }

  // ---- Core Logic ----
  let isOpen = false;
  let fallbackIndex = 0;

  function getResponse(input) {
    const lower = input.toLowerCase().trim();

    for (const entry of knowledgeBase) {
      for (const keyword of entry.keywords) {
        if (lower.includes(keyword)) {
          return entry;
        }
      }
    }

    // Fallback
    const resp = fallbackResponses[fallbackIndex % fallbackResponses.length];
    fallbackIndex++;
    return {
      response: resp,
      quickReplies: ['Wisata populer', 'Kuliner khas', 'Info tiket', 'Hubungi kami']
    };
  }

  function addMessage(text, type) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-msg', type);
    msgDiv.innerHTML = text.replace(/\n/g, '<br>');
    messagesContainer.appendChild(msgDiv);
    scrollToBottom();
  }

  function addQuickReplies(replies) {
    if (!replies || replies.length === 0) return;

    const messagesContainer = document.getElementById('chatbot-messages');
    const container = document.createElement('div');
    container.classList.add('chat-quick-replies');

    replies.forEach(function (text) {
      const btn = document.createElement('button');
      btn.textContent = text;
      btn.addEventListener('click', function () {
        handleUserInput(text);
        // Remove quick replies after click
        container.remove();
      });
      container.appendChild(btn);
    });

    messagesContainer.appendChild(container);
    scrollToBottom();
  }

  function showTyping() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('chat-typing');
    typingDiv.id = 'chatbot-typing';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(typingDiv);
    scrollToBottom();
  }

  function removeTyping() {
    const typing = document.getElementById('chatbot-typing');
    if (typing) typing.remove();
  }

  function scrollToBottom() {
    const messagesContainer = document.getElementById('chatbot-messages');
    setTimeout(function () {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 50);
  }

  function handleUserInput(text) {
    if (!text.trim()) return;

    // Remove existing quick replies
    var existingReplies = document.querySelectorAll('.chat-quick-replies');
    existingReplies.forEach(function (el) { el.remove(); });

    // Add user message
    addMessage(text, 'user');

    // Show typing indicator
    showTyping();

    // Bot response with delay
    var delay = 600 + Math.random() * 800;
    setTimeout(function () {
      removeTyping();
      var result = getResponse(text);
      addMessage(result.response, 'bot');

      // Add quick replies after a short delay
      setTimeout(function () {
        addQuickReplies(result.quickReplies);
      }, 300);
    }, delay);
  }

  function toggleChat() {
    var toggleBtn = document.getElementById('chatbot-toggle');
    var chatWindow = document.getElementById('chatbot-window');
    var badge = document.getElementById('chatbot-badge');

    isOpen = !isOpen;

    if (isOpen) {
      toggleBtn.classList.add('active');
      chatWindow.classList.add('open');
      badge.classList.add('hidden');

      // Focus input
      setTimeout(function () {
        document.getElementById('chatbot-input-field').focus();
      }, 400);
    } else {
      toggleBtn.classList.remove('active');
      chatWindow.classList.remove('open');
    }
  }

  function showWelcomeMessage() {
    setTimeout(function () {
      addMessage('Halo! 👋 Selamat datang di <b>Pesona Sumut</b>.\n\nSaya bot pemandu wisata Sumatera Utara. Tanyakan apa saja tentang destinasi wisata, kuliner khas, tiket, atau penginapan! 😊', 'bot');

      setTimeout(function () {
        addQuickReplies(['Wisata populer', 'Kuliner khas', 'Info tiket', 'Penginapan']);
      }, 400);
    }, 500);
  }

  // ---- Initialize ----
  function init() {
    injectChatbotHTML();

    // Toggle chat
    document.getElementById('chatbot-toggle').addEventListener('click', function () {
      toggleChat();

      // Show welcome message on first open
      var messagesContainer = document.getElementById('chatbot-messages');
      if (messagesContainer.children.length === 0) {
        showWelcomeMessage();
      }
    });

    // Send message on button click
    document.getElementById('chatbot-send-btn').addEventListener('click', function () {
      var input = document.getElementById('chatbot-input-field');
      handleUserInput(input.value);
      input.value = '';
    });

    // Send message on Enter key
    document.getElementById('chatbot-input-field').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        handleUserInput(this.value);
        this.value = '';
      }
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
