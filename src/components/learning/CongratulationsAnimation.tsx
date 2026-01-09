import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CongratulationsAnimationProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  type?: 'profile' | 'module' | 'lesson' | 'quiz';
}

const confettiColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA'];

export function CongratulationsAnimation({
  show,
  onClose,
  title = "Congratulations! 🎉",
  message = "You've achieved something amazing!",
  type = 'lesson'
}: CongratulationsAnimationProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([]);

  useEffect(() => {
    if (show) {
      // Generate confetti
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        delay: Math.random() * 0.5
      }));
      setConfetti(newConfetti);
    }
  }, [show]);

  const getIcon = () => {
    switch (type) {
      case 'profile':
        return <Sparkles className="w-12 h-12 text-yellow-400" />;
      case 'module':
        return <Trophy className="w-12 h-12 text-yellow-400" />;
      case 'quiz':
        return <Star className="w-12 h-12 text-yellow-400" />;
      default:
        return <Star className="w-12 h-12 text-yellow-400" />;
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Confetti */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {confetti.map((piece) => (
              <motion.div
                key={piece.id}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${piece.x}%`,
                  backgroundColor: piece.color,
                  top: -20
                }}
                initial={{ y: 0, rotate: 0, opacity: 1 }}
                animate={{
                  y: window.innerHeight + 100,
                  rotate: 720,
                  opacity: 0
                }}
                transition={{
                  duration: 3,
                  delay: piece.delay,
                  ease: 'easeOut'
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="bg-card border border-border rounded-2xl p-8 max-w-md mx-4 text-center relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent pointer-events-none" />

            {/* Icon with animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2, damping: 10 }}
              className="relative z-10 mb-6"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center"
              >
                {getIcon()}
              </motion.div>

              {/* Sparkle effects */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${30 + i * 20}%`,
                    left: `${20 + i * 25}%`
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
              ))}
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-foreground mb-2 relative z-10"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-6 relative z-10"
            >
              {message}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative z-10"
            >
              <Button onClick={onClose} className="px-8">
                Continue
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
