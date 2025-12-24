import React, { useState, useEffect } from 'react';

// Data Palsu (Testimoni)
const fakeTestimonials = [
  { text: "Mantap! Kuota 100GB langsung masuk setelah 2 menit. Terima kasih Telkoms*l!", user: "Budi S." },
  { text: "Awalnya ragu, tapi ternyata benar! Lumayan buat nonton maraton liburan Tahun Baru!", user: "Siti K." },
  { text: "Prosesnya cepat dan mudah. Akhirnya bisa menikmati 100GB gratis, makasih T-SEL!", user: "Joko A." },
];

const PhishingSimulatorModern = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  
  const requiredShares = 5;
  const timerDuration = 5 * 60; 
  const [timeRemaining, setTimeRemaining] = useState(timerDuration);

  // Efek untuk Carousel Testimoni
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) => 
        (prevIndex + 1) % fakeTestimonials.length
      );
    }, 4000); 
    return () => clearInterval(testimonialInterval);
  }, []);

  // Efek untuk Timer Urgensi
  useEffect(() => {
    if (step === 1) {
      const timerInterval = setInterval(() => {
        setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [step]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Langkah 1: Handle Klaim Kuota
  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneRegex = /^08\d{8,11}$/;
    
    if (phoneRegex.test(phoneNumber)) {
      setIsValidPhone(true);
      
      console.log(
        `[⚠️ SIMULASI PHISHING - DATA DICURI]: Nomor ${phoneNumber} dikirim ke server backend palsu.`
      );
      
      setStep(2); 
    } else {
      setIsValidPhone(false);
    }
  };

  // Langkah 2: Handle Simulasi Berbagi
  const handleShare = () => {
    if (shareCount < requiredShares) {
        setShareCount(shareCount + 1);
        alert(`[SIMULASI WA] Anda baru saja berbagi ke kontak ke-${shareCount + 1}. Klik lagi hingga ${requiredShares}x.`);
    } else {
        setStep(3); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-red-800 to-yellow-600 flex flex-col items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden my-8 transform transition duration-500 hover:scale-[1.02] border-4 border-yellow-400">
        
        {/* Header */}
        <header className="p-6 bg-gray-900 text-white text-center">
          <p className="text-sm font-semibold text-yellow-400">Selamat Tahun Baru!</p>
          <h1 className="text-4xl font-extrabold mt-1 text-red-500 tracking-wider">
            BONUS 100GB
          </h1>
          <p className="mt-2 text-md font-light border-t border-gray-700 pt-2">
             Khusus Pelanggan T-SEL Pilihan (Edisi Liburan Terbatas)
          </p>
        </header>

        {/* Testimoni Palsu */}
        <div className="bg-red-50 p-3 border-b border-red-200">
            <div className="h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md transition duration-500 ease-in-out">
                <p className="text-sm italic text-gray-700 font-medium">
                    "🌟 {fakeTestimonials[currentTestimonialIndex].text}" - **{fakeTestimonials[currentTestimonialIndex].user}**
                </p>
            </div>
        </div>

        {/* Konten Utama */}
        <div className="p-6">
          
          {/* STEP 1: Input Nomor */}
          {step === 1 && (
            <section>
              <div className="text-center mb-6 p-3 bg-red-100 rounded-lg border border-red-300">
                <p className="text-lg font-bold text-red-800 flex items-center justify-center">
                    <span className="text-2xl mr-2">⏳</span> WAKTU TERBATAS: {formatTime(timeRemaining)}
                </p>
              </div>

              <h2 className="text-2xl font-bold text-center text-red-700 mb-5">Verifikasi Nomor untuk Klaim Kuota!</h2>
              
              <form onSubmit={handleClaim} className="space-y-6">
                <div className="relative">
                    <input
                      type="tel"
                      placeholder="Masukkan Nomor Telp Aktif (Contoh: 0812xxxxxx)"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={`w-full p-4 border-2 ${isValidPhone ? 'border-gray-300' : 'border-red-500'} rounded-xl text-lg focus:ring-red-500 focus:border-red-500 transition duration-300`}
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">📱</span>
                </div>
                
                {!isValidPhone && (
                  <p className="text-sm text-red-500 font-medium flex items-center">
                    <span className="mr-1">⚠️</span> Format nomor telepon tidak valid. Pastikan diawali 08xx...
                  </p>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-extrabold py-4 rounded-xl text-xl shadow-lg transition duration-300 transform hover:scale-[1.01]"
                >
                  <span className="animate-pulse">KLIK UNTUK KLAIM 100GB SEKARANG!</span>
                </button>
              </form>
            </section>
          )}

          {/* STEP 2: Paksa Berbagi WA */}
          {step === 2 && (
            <section className="text-center">
              <h2 className="text-2xl font-bold text-red-700 mb-4 flex items-center justify-center">
                <span className="mr-2 text-yellow-500">✨</span> VERIFIKASI AKHIR
              </h2>
              <p className="mb-6 text-gray-700 font-medium text-lg">
                Anda **WAJIB** membagikan pesan promosi ini ke **{requiredShares}** kontak/grup WhatsApp aktif.
              </p>
              
              <div className="bg-green-100 p-4 rounded-xl mb-6 border-2 border-green-500 shadow-inner">
                <p className="font-bold text-3xl text-green-800">
                    SISA BAGI: {requiredShares - shareCount}
                </p>
              </div>

              <button
                onClick={handleShare}
                disabled={shareCount >= requiredShares}
                className={`w-full text-white font-extrabold py-4 rounded-xl text-xl shadow-lg transition duration-300 flex items-center justify-center space-x-2 
                    ${shareCount < requiredShares ? 'bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800' : 'bg-gray-400 cursor-not-allowed'}`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2C6.54 2 2.05 6.49 2.05 12c0 1.58.46 3.06 1.25 4.39l-1.3 4.74 5.25-1.4a9.97 9.97 0 0 0 13.9-9.43c.01-5.5-4.48-9.99-9.97-9.99zm0 18a8.03 8.03 0 0 1-4.2-1.12l-.29-.17-3.13.82.83-3.05-.18-.28a8.05 8.05 0 0 1-1.2-4.22c0-4.42 3.6-8.02 8.02-8.02 4.41 0 8.02 3.6 8.02 8.02 0 4.42-3.61 8.02-8.02 8.02zm-3.8-5.32c-.17-.08-.4-.13-.6-.13-.42 0-.85.16-1.16.48-.3.31-.47.74-.47 1.16 0 .42.17.82.47 1.15.31.32.74.49 1.16.49.2 0 .44-.06.6-.13l.23-.11.66-.37-.09-.08c-1.3-1.07-2.61-2.14-3.92-3.21-.07-.06-.11-.14-.14-.23l-.06-.21c0-.14.07-.33.19-.48.11-.15.28-.24.47-.24.16 0 .3.05.42.15l.3.26c.26.23.63.4.92.4.29 0 .5-.1.65-.3.14-.19.06-.43-.1-.65-.16-.22-.36-.4-.53-.57l-.37-.36c-.23-.23-.27-.58-.1-.86.15-.27.46-.42.76-.42.27 0 .52.1.72.3.2.2.46.46.6.65.14.19.26.4.4.6.14.2.34.4.58.4.24 0 .47-.1.62-.27.15-.17.21-.39.21-.65 0-.25-.08-.47-.23-.65l-.33-.42c-.15-.19-.34-.4-.53-.57-.19-.19-.34-.4-.45-.63-.11-.23-.15-.49-.15-.75 0-.42.17-.82.47-1.16.31-.33.74-.49 1.16-.49.2 0 .44.06.6.13l.23.11.66.37c.2.1.34.16.5.16.14 0 .28-.05.42-.15.14-.1.21-.24.21-.38 0-.14-.05-.28-.15-.42-.1-.14-.24-.21-.4-.21-.2 0-.4.07-.58.21l-.22.17-.4-.14c-.16-.06-.32-.09-.5-.09-.34 0-.67.12-.95.34l-.45.36c-.3.23-.49.56-.57.94-.07.38-.05.77.06 1.13.1.37.28.72.5.99l.2.24z" /></svg>
                {shareCount < requiredShares ? 'BAGIKAN DI WA (KLIK DI SINI)' : 'PROSES KUOTA SEKARANG'}
              </button>
            </section>
          )}
          
          {/* STEP 3: Proses & Sukses Palsu */}
          {step === 3 && (
            <section className="text-center">
              <h2 className="text-3xl font-bold text-green-600 mb-4 flex items-center justify-center">
                <span className="mr-2">🎉</span> KLAIM BERHASIL!
              </h2>
              
              <div className="my-6">
                <div className="animate-bounce text-6xl text-yellow-500">✅</div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Kuotamu Akan Dikirim!</h3>
              <p className="text-lg mb-6 text-gray-700">
                Verifikasi selesai. Kuota 100GB akan masuk ke nomor **{phoneNumber}** dalam waktu **maksimal 2 Menit**. Harap tunggu!
              </p>
              
              <blockquote className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500 italic text-sm text-red-700 mt-6 shadow-inner">
                **Pesan Edukasi:** Ingat, ini adalah situs palsu. Data (Nomor HP) Anda sudah dicuri untuk dijual, dan Anda tidak akan pernah menerima kuota 100GB.
              </blockquote>
            </section>
          )}

        </div>
        
        {/* Footer Simulasi */}
        <footer className="p-4 bg-gray-900 text-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Telkoms*l. Syarat dan Ketentuan Berlaku. (Demo Edukasi Anti-Phishing)</p>
        </footer>
        
      </div>
      <p className="mt-4 text-xs text-white/70">
        *Ini adalah simulasi frontend anti-phishing. Data nomor telepon tidak dikirim atau disimpan.*
      </p>
    </div>
  );
};

export default PhishingSimulatorModern;
