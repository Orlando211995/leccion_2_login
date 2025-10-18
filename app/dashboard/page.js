'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Layers,
  User,
  ShoppingCart,
  Star,
  Settings,
  LogOut,
} from 'lucide-react';

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('');
  const [activeSection, setActiveSection] = useState('catalogo');
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!email || isAuthenticated !== 'true') {
      router.push('/');
      return;
    }

    setUserEmail(email);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    router.push('/');
  };

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'catalogo', name: 'Catálogo de Libros', icon: BookOpen },
    { id: 'categorias', name: 'Categorías / Temáticas', icon: Layers },
    { id: 'autores', name: 'Autores', icon: User },
    { id: 'ventas', name: 'Ventas o Pedidos', icon: ShoppingCart },
    { id: 'recomendaciones', name: 'Recomendaciones', icon: Star },
    { id: 'configuracion', name: 'Configuración / Perfil', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'catalogo':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">📚 Catálogo de Libros</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'El Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasía' },
                { title: '1984', author: 'George Orwell', genre: 'Ciencia Ficción' },
                { title: 'Orgullo y Prejuicio', author: 'Jane Austen', genre: 'Romance' },
              ].map((book, index) => (
                <div key={index} className="bg-white shadow rounded-lg p-5 border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded mt-2 inline-block">
                    {book.genre}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'categorias':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">🧠 Categorías / Temáticas</h2>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Fantasía', 'Ciencia Ficción', 'Misterio', 'Romance', 'Terror', 'Historia', 'Filosofía', 'Autoayuda'].map(
                (cat, i) => (
                  <li
                    key={i}
                    className="bg-white border border-gray-200 rounded-lg p-4 text-center font-medium text-gray-700 shadow-sm hover:shadow-md transition"
                  >
                    {cat}
                  </li>
                )
              )}
            </ul>
          </div>
        );

      case 'autores':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">👤 Autores</h2>
            <div className="space-y-4">
              {['Tolkien', 'Orwell', 'Stephen King', 'Isabel Allende', 'Gabriel García Márquez'].map(
                (author, i) => (
                  <div key={i} className="bg-white shadow-sm border rounded-lg p-4">
                    <h3 className="text-lg font-semibold">{author}</h3>
                    <p className="text-sm text-gray-500">Autor destacado</p>
                  </div>
                )
              )}
            </div>
          </div>
        );

      case 'ventas':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">🛒 Ventas o Pedidos</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-700">Aquí puedes revisar tus ventas y pedidos recientes.</p>
              <ul className="mt-4 space-y-2">
                <li className="text-sm text-gray-600">• Pedido #1023 — “El Hobbit” — 2 unidades</li>
                <li className="text-sm text-gray-600">• Pedido #1024 — “1984” — 1 unidad</li>
                <li className="text-sm text-gray-600">• Pedido #1025 — “It” — 3 unidades</li>
              </ul>
            </div>
          </div>
        );

      case 'recomendaciones':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">⭐ Recomendaciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Dune', reason: 'Si te gustó 1984, te encantará esta epopeya sci-fi' },
                { title: 'El Nombre del Viento', reason: 'Ideal si te apasiona la fantasía detallada' },
                { title: 'Cien Años de Soledad', reason: 'Una joya del realismo mágico' },
              ].map((rec, i) => (
                <div key={i} className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition">
                  <h3 className="text-lg font-medium">{rec.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{rec.reason}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'configuracion':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">⚙️ Configuración / Perfil</h2>
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <p className="text-gray-700 mb-2">Usuario: {userEmail}</p>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-indigo-700">📖 NightWolf Books</h1>
          <p className="text-sm text-gray-500 mt-1">Panel de Librería</p>
        </div>
        <nav className="mt-6 space-y-1">
          {sections.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center px-5 py-3 text-left text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition ${
                activeSection === id ? 'bg-indigo-100 text-indigo-700 font-medium' : ''
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {name}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-6 left-0 w-full px-5">
          <button
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-700 font-medium"
          >
            <LogOut className="w-5 h-5 mr-2" /> Salir
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Bienvenido, {userEmail}</h2>
          <p className="text-gray-500 mt-1">Explora y gestiona tu librería</p>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}


