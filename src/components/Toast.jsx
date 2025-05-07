import { useEffect, useState } from 'react';
// eslint-disable-next-line
import { AnimatePresence, motion } from 'framer-motion';
import { useCoinContext } from '../context/CoinContext';

export default function IOSToast() {
  const { toastMessage, setToastMessage } = useCoinContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setToastMessage(""), 300); // Wait for exit animation to clear message
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, setToastMessage]);

  return (
    <AnimatePresence>
      {visible && toastMessage && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 30, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        >
          <div className="mt-4 w-[90%] max-w-sm bg-white/50 backdrop-blur-lg text-black text-sm font-medium px-4 py-2 rounded-xl shadow-xl border border-gray-300">
            {toastMessage}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
