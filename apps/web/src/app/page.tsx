import Hero from '@/components/Hero'
import styles from './page.module.css'
import Events from '@/components/Events'

export default function Home() {
  return (
    <main className="main">
      <Hero />
      <Events />
      <div className='description'>
        <p>Get started by editing&nbsp;
          <code className='code'>src/app/page.tsx</code>
        </p>
      </div>
    </main>
  )
}
