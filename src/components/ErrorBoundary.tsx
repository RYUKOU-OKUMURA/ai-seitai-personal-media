import React, { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl w-full border-l-4 border-red-500">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-4xl text-red-500">error</span>
              <h1 className="text-2xl font-bold text-gray-900">アプリケーションエラーが発生しました</h1>
            </div>
            <p className="text-gray-600 mb-6">
              予期せぬエラーによりアプリケーションの表示が中断されました。以下のエラー内容を確認してください。
            </p>
            
            <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto mb-6">
              <p className="font-mono text-red-400 font-bold mb-2">
                {this.state.error?.toString()}
              </p>
              {this.state.errorInfo && (
                <pre className="font-mono text-gray-400 text-xs leading-relaxed">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              ページを再読み込み
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
