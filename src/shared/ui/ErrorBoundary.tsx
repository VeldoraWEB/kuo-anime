import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] p-4 text-center select-none">
          
          <div 
            className="relative w-full max-w-lg" 
            style={{ containerType: 'inline-size' }}
          >
            <img 
              src={`${import.meta.env.BASE_URL}luffy-sign.png`} 
              alt="Luffy holding a sign" 
              className="w-full object-contain drop-shadow-[0_10px_30px_rgba(139,92,246,0.3)]" 
            />
            
            <div 
              className="absolute flex flex-col items-center justify-center"
              style={{ 
                top: '40%',   
                left: '20%',   
                width: '32%',  
                height: '35%',
                transform: 'rotate(-3deg)' 
              }}
            >
              
              <div 
                className="flex items-center justify-center font-black text-white bg-[#cc0000] border-[0.8cqw] border-black rounded-full"
                style={{ 
                  width: '14cqw', 
                  height: '14cqw', 
                  fontSize: '10cqw', 
                  marginBottom: '2cqw',
                  transform: 'rotate(5deg)', 
                  boxShadow: '2px 2px 0px rgba(0,0,0,0.2)' 
                }}
              >
                !
              </div>

              <p 
                className="font-black text-black uppercase italic tracking-tighter"
                style={{ 
                  fontSize: '11cqw', 
                  lineHeight: 1,
                  WebkitTextStroke: '0.5cqw black', 
                  textShadow: '2px 2px 0px rgba(0,0,0,0.1)' 
                }} 
              >
                ОШИБКА
              </p>
            </div>
          </div>

          <h2 className="mt-8 text-3xl font-bold text-white">Что-то пошло не так...</h2>
          <p className="mt-3 text-zinc-400 max-w-md text-sm sm:text-base">
            Вернитесь на главную страницу
          </p>
          
          <button
            onClick={() => window.location.href = import.meta.env.BASE_URL}
            className="mt-6 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-3 font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            На главную
          </button>
        </div>
      )
    }
    return this.props.children
  }
}