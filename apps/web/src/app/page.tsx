import Hero from '@/components/Hero'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className="main">
      <Hero />
      <div className='description'>
        <p>Get started by editing&nbsp;
          <code className='code'>src/app/page.tsx</code>
        </p>
      </div>
    </main>
  )
}
