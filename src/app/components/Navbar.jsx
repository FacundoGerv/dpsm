import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import firebaseApp from '@/app/firebase';
import styles from '@/app/styles/navbar.module.css';
import wide from '@/app/styles/navbarwide.module.css';


const Navbar = () => {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { user, googleSignIn, logOut } = UserAuth();
  const router = useRouter();
  const categories = ['autos', 'motos', 'celulares', 'pitos de goma', 'yo que se']
  const handleSignIn = async () => {
    try {
      await googleSignIn();
      router.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push(`/?mode=${mode}`)
    } catch (error) {
      console.log(error);
    }
  };

  var logindwn = document.getElementById('navlist');

  const handleNavDropdown = () => {
    try {
      logindwn = document.getElementById('navlist');
      logindwn.style.display === 'block' ? logindwn.style.display = 'none' : logindwn.style.display = 'block';
    }
    catch (e) {
      logindwn = document.getElementById('navlist');
      console.log(e);
    }
  }
  const hideNav = () => {
    try {
      logindwn = document.getElementById('navlist');
      logindwn.style.display = 'none';
    }
    catch (e) {
      logindwn = document.getElementById('navlist');
      console.error(e.error);
    }
  }

  return (
    <div className='fixed w-full z-50'>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />


      <div className={wide.navWrapper}>
        <ul className={wide.navbarContainer}>
          <Link href={`/`}>
            <li className={`${pathname === '/' ? 'bg-violet-800 bg-opacity-60' : ''} ${styles.navItem}`}>
              <span>Home</span>
            </li>
          </Link>
          <Link href={`/products`}>
            <li className={`${pathname === '/products' ? 'bg-violet-800 bg-opacity-60' : ''} ${styles.navItem}`}>
              <span>Productos</span>
            </li>
          </Link>
          <Link href={`/favorites`}>
            <li className={`${pathname === '/favorites' ? 'bg-violet-800 bg-opacity-60' : ''} ${styles.navItem}`}>
              <span>Home</span>
            </li>
          </Link>
        </ul>
        <div>
          {pathname === '/products' && (

            <ul className="w-full bg-emerald-400 flex gap-3 p-1" >
              {categories.map((cat) => (
                <>
                  <li className="bg-yellow-500">
                    {cat}
                  </li>
                </>
              ))}

            </ul>
          )}
        </div>
      </div>







      <div className={styles.menuIcon} onClick={handleNavDropdown}>
        <i className="fa fa-thin fa-bars fa-2xl text-xl text-white"></i>
        <span className={styles.menuTitle}>DPSM</span>
      </div>
      <div className={styles.navWrapper} id="navlist">
        <ul className={styles.navList}>
          <Link href={`/`} onClick={hideNav}>
            <li className={`${pathname === '/' ? 'bg-violet-800 bg-opacity-60' : ''} ${styles.navItem}`}>
              <span>Home</span>
            </li>
          </Link>
          <Link href={`/products`} onClick={hideNav}>
            <li className={`${pathname === '/products' ? 'bg-violet-800 bg-opacity-60' : ''} ${styles.navItem}`}>
              <span>Productos</span>
            </li>
          </Link>
          {user && (
            <Link href={`/favorites`} onClick={hideNav}>
              <li className={`${pathname === '/favorites' ? 'bg-violet-800 bg-opacity-60' : ''} ${styles.navItem}`}>
                <span>Favoritos</span>
              </li>
            </Link>
          )}
          <ul className="absolute bottom-2 w-full">
            <div className={styles.navDivLine}>
              <span>Administrar Página</span>
              <div className={styles.navInnerLine}></div>
            </div>
            {user ? (
              <>
                <Link href={`/editpage`} onClick={hideNav}>
                  <li className={`${styles.navItem}`}>
                    <span>
                      Añadir Producto
                    </span>
                  </li>
                </Link>
                <Link href={`/editpage`} onClick={hideNav}>
                  <li className={`${styles.navItem}`}>
                    <span>
                      Control Stock
                    </span>
                  </li>
                </Link>
                <Link href={`/editpage`} onClick={hideNav}>
                  <li className={`${styles.navItem}`}>
                    <span>
                      Administrar Usuarios
                    </span>
                  </li>
                </Link>
                <Link href={`/editpage`} onClick={hideNav}>
                  <li className={`${styles.navItem} ${pathname === '/editpage' ? 'bg-violet-800 bg-opacity-60' : ''}`}>
                    <span>
                      Editar Página
                    </span>
                  </li>
                </Link>
                <li className={`${styles.navItem} bg-red-400 bg-opacity-20`} onClick={handleSignOut}>
                  <span>
                    Cerrar Sesión
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className={`${styles.navItem} bg-violet-300 bg-opacity-20`} onClick={handleSignIn}>
                  <span>Iniciar Sesión</span>
                </li>
              </>
            )}
          </ul>
        </ul>
        <div className={styles.clicker} onClick={handleNavDropdown}>
        </div>
      </div>
    </div>


  );
};

export default Navbar;