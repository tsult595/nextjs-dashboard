import React from 'react';
import Cards from '../ui/helpDashboard/cards';

export default function Page() {
  return (
    <main>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Чем мы можем помочь?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Найдите ответы на популярные вопросы или свяжитесь с нами
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Cards title='FAQ' value='Ответы на частые вопросы' />
        <Cards title='Руководства' value='Пошаговые инструкции' />
        <Cards title='Контакты' value='Свяжитесь с поддержкой' />
        <Cards title='Контакты' value='Свяжитесь с нами' />
        <Cards title='Контакты' value='Свяжитесь с ним' />
      </div>
    </main>
  );
}