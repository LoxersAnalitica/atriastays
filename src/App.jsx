import { useState, useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════════════════
   ATRIA STAYS — Landing Page de Venta
   Propiedades de lujo en el Barrio de Salamanca
   ═══════════════════════════════════════════════════════════════ */

// ── Scroll reveal hook ────────────────────────────────────────
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    const elements = ref.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return ref
}

// ── SVG Icons ─────────────────────────────────────────────────
const Icons = {
  curaduria: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  discrecion: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  inteligencia: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  acompanamiento: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
}

// ── Navigation ────────────────────────────────────────────────
function Navigation({ onCtaClick }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} id="nav">
      <div className="nav__inner">
        <a href="#" className="nav__logo">
          Atria <span>Stays</span>
        </a>
        <button className="nav__cta" onClick={onCtaClick} id="nav-cta">
          <span className="nav__cta-text">Solicitar acceso</span>
        </button>
      </div>
    </nav>
  )
}

// ── Hero Section ──────────────────────────────────────────────
function HeroSection({ onCtaClick }) {
  return (
    <section className="hero section" id="hero">
      <div className="hero__bg">
        <img
          src="/images/hero-door.png"
          alt="Puerta clásica del Barrio de Salamanca"
          loading="eager"
        />
      </div>
      <div className="container">
        <div className="hero__content">
          <div className="hero__eyebrow">Barrio de Salamanca · Madrid</div>
          <h1 className="hero__title">
            Donde la historia de Madrid se encuentra con su próximo <em>patrimonio.</em>
          </h1>
          <p className="hero__subtitle">
            Acceso exclusivo a las propiedades más singulares y privadas del Barrio de Salamanca.
            Gestionamos activos que, por su naturaleza, nunca llegan al mercado abierto.
          </p>
          <div className="hero__cta">
            <button className="btn btn--primary btn--large" onClick={onCtaClick} id="hero-cta">
              Solicitar acceso al catálogo privado
            </button>
          </div>
        </div>
      </div>
      <div className="hero__scroll-indicator">
        <span>Descubra</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}

// ── Exclusivity Section ───────────────────────────────────────
function ExclusivitySection() {
  const sectionRef = useReveal()

  return (
    <section className="exclusivity section" id="exclusividad" ref={sectionRef}>
      <div className="container">
        <div className="exclusivity__grid">
          <div className="exclusivity__image reveal">
            <img
              src="/images/molding-detail.png"
              alt="Moldura restaurada en un palacete del Barrio de Salamanca"
              loading="lazy"
            />
            <div className="exclusivity__stat">
              <div className="exclusivity__stat-number">70%</div>
              <div className="exclusivity__stat-label">Transacciones Off-Market</div>
            </div>
          </div>
          <div className="exclusivity__content">
            <div className="section-label reveal">Exclusividad</div>
            <h2 className="section-title reveal reveal-delay-1">
              El lujo real no se anuncia, se descubre.
            </h2>
            <div className="divider reveal reveal-delay-2" />
            <p className="exclusivity__text reveal reveal-delay-2">
              En las calles del Barrio de Salamanca, las oportunidades más extraordinarias
              suelen ser invisibles para el gran público. En Atria Stays, el 70% de nuestras
              transacciones se realizan bajo el formato off-market.
            </p>
            <p className="exclusivity__text reveal reveal-delay-3">
              Nuestra labor no es solo mostrar viviendas, sino actuar como custodios de su
              privacidad y tiempo. Si busca una joya arquitectónica en Recoletos, un ático con
              vistas en Castellana o una inversión estratégica en Goya, le abrimos las puertas
              a lo que nadie más puede ver.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Services Section ──────────────────────────────────────────
function ServicesSection() {
  const sectionRef = useReveal()

  const services = [
    {
      icon: Icons.curaduria,
      title: 'Curaduría de Activos',
      desc: 'Solo le presentamos propiedades que cumplen con sus estándares técnicos y estéticos. Cada activo es evaluado bajo criterios de excelencia antes de llegar a usted.',
    },
    {
      icon: Icons.discrecion,
      title: 'Discreción Absoluta',
      desc: 'Protegemos su identidad y la confidencialidad de la operación desde el primer contacto. Su privacidad es nuestro compromiso más firme.',
    },
    {
      icon: Icons.inteligencia,
      title: 'Inteligencia de Mercado',
      desc: 'Datos reales de cierre y análisis de rentabilidad en el código postal más estable de Europa. Información que no encontrará en ningún portal.',
    },
    {
      icon: Icons.acompanamiento,
      title: 'Acompañamiento 360º',
      desc: 'Soporte legal, fiscal y técnico para que usted solo tenga que elegir su nueva llave. Gestionamos cada detalle de la operación.',
    },
  ]

  return (
    <section className="services section" id="servicios" ref={sectionRef}>
      <div className="container">
        <div className="services__header">
          <div className="section-label reveal" style={{ justifyContent: 'center' }}>
            Servicio personalizado
          </div>
          <h2 className="section-title reveal reveal-delay-1">
            Su experiencia con nosotros
          </h2>
          <div className="divider divider--center reveal reveal-delay-2" />
        </div>
        <div className="services__grid reveal reveal-delay-2">
          {services.map((s, i) => (
            <div className="service-card" key={i} id={`service-${i}`}>
              <div className="service-card__icon">{s.icon}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Barrio Section ────────────────────────────────────────────
function BarrioSection() {
  const sectionRef = useReveal()

  return (
    <section className="barrio section" id="barrio" ref={sectionRef}>
      <div className="barrio__bg">
        <img
          src="/images/retiro-view.png"
          alt="Vista del Retiro desde un ático en Salamanca"
          loading="lazy"
        />
      </div>
      <div className="container">
        <div className="barrio__content">
          <div className="section-label reveal">La Milla de Oro</div>
          <h2 className="section-title reveal reveal-delay-1">
            Su ecosistema de éxito.
          </h2>
          <div className="divider reveal reveal-delay-2" />
          <p className="barrio__text reveal reveal-delay-2">
            Más que una ubicación, es un estándar de vida. Vivir aquí es respirar la elegancia
            de las fincas clásicas del siglo XIX, caminar hacia las boutiques de la calle Serrano
            y disfrutar de la mejor oferta gastronómica de la capital.
          </p>
          <p className="barrio__text reveal reveal-delay-3">
            Entendemos la idiosincrasia de cada manzana: desde la tranquilidad de Lista hasta la
            vibrante energía de Jorge Juan. Sabemos dónde está la luz, dónde está el silencio
            y dónde está la rentabilidad.
          </p>
          <div className="barrio__highlights reveal reveal-delay-4">
            <div className="barrio__highlight">
              <div className="barrio__highlight-value">S. XIX</div>
              <div className="barrio__highlight-label">Patrimonio arquitectónico</div>
            </div>
            <div className="barrio__highlight">
              <div className="barrio__highlight-value">Nº1</div>
              <div className="barrio__highlight-label">Código postal de Europa</div>
            </div>
            <div className="barrio__highlight">
              <div className="barrio__highlight-value">∞</div>
              <div className="barrio__highlight-label">Potencial de revalorización</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Profile Section ───────────────────────────────────────────
function ProfileSection() {
  const sectionRef = useReveal()

  return (
    <section className="profile section" id="perfil" ref={sectionRef}>
      <div className="container">
        <div className="profile__inner">
          <div className="section-label reveal" style={{ justifyContent: 'center' }}>
            Nuestro compromiso
          </div>
          <h2 className="section-title reveal reveal-delay-1">
            Un servicio a la altura de sus expectativas.
          </h2>
          <div className="divider divider--center reveal reveal-delay-2" />
          <p className="profile__text reveal reveal-delay-2">
            Atendemos a un perfil de cliente que valora la eficiencia y la sofisticación. Ya sea
            un inversor internacional buscando la seguridad del ladrillo madrileño o una familia
            que desea un hogar generacional, nuestro enfoque es el mismo: excelencia sin concesiones.
          </p>
          <div className="profile__badge reveal reveal-delay-3">
            <div className="profile__badge-dot" />
            Acceso por invitación
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Country Prefixes ──────────────────────────────────────────
const COUNTRY_PREFIXES = [
  { code: '+34', country: 'España', flag: '🇪🇸' },
  { code: '+44', country: 'Reino Unido', flag: '🇬🇧' },
  { code: '+1', country: 'Estados Unidos', flag: '🇺🇸' },
  { code: '+33', country: 'Francia', flag: '🇫🇷' },
  { code: '+49', country: 'Alemania', flag: '🇩🇪' },
  { code: '+39', country: 'Italia', flag: '🇮🇹' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹' },
  { code: '+41', country: 'Suiza', flag: '🇨🇭' },
  { code: '+31', country: 'Países Bajos', flag: '🇳🇱' },
  { code: '+32', country: 'Bélgica', flag: '🇧🇪' },
  { code: '+46', country: 'Suecia', flag: '🇸🇪' },
  { code: '+47', country: 'Noruega', flag: '🇳🇴' },
  { code: '+45', country: 'Dinamarca', flag: '🇩🇰' },
  { code: '+43', country: 'Austria', flag: '🇦🇹' },
  { code: '+352', country: 'Luxemburgo', flag: '🇱🇺' },
  { code: '+377', country: 'Mónaco', flag: '🇲🇨' },
  { code: '+971', country: 'Emiratos Árabes', flag: '🇦🇪' },
  { code: '+966', country: 'Arabia Saudí', flag: '🇸🇦' },
  { code: '+52', country: 'México', flag: '🇲🇽' },
  { code: '+55', country: 'Brasil', flag: '🇧🇷' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+81', country: 'Japón', flag: '🇯🇵' },
  { code: '+82', country: 'Corea del Sur', flag: '🇰🇷' },
  { code: '+7', country: 'Rusia', flag: '🇷🇺' },
  { code: '+90', country: 'Turquía', flag: '🇹🇷' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+27', country: 'Sudáfrica', flag: '🇿🇦' },
  { code: '+212', country: 'Marruecos', flag: '🇲🇦' },
]

// ── Wizard Steps Config ───────────────────────────────────────
const WIZARD_STEPS = [
  { key: 'name', label: 'Nombre completo', type: 'text', placeholder: 'Su nombre completo', required: true },
  { key: 'email', label: 'Correo electrónico profesional', type: 'email', placeholder: 'nombre@empresa.com', required: true },
  { key: 'phone', label: 'Teléfono de contacto', type: 'tel', placeholder: '600 000 000', required: true },
  { key: 'interest', label: 'Interés', type: 'select', required: true, options: [
    { value: '', label: 'Seleccione' },
    { value: 'inversion', label: 'Inversión' },
    { value: 'residencia', label: 'Residencia' },
  ]},
  { key: 'budget', label: 'Presupuesto estimado', type: 'select', required: false, options: [
    { value: '', label: 'Opcional' },
    { value: '500k-1m', label: '500.000€ — 1M€' },
    { value: '1m-2m', label: '1M€ — 2M€' },
    { value: '2m-5m', label: '2M€ — 5M€' },
    { value: '5m+', label: '+5M€' },
  ]},
]

// ── Lead Form Section ─────────────────────────────────────────
function LeadFormSection() {
  const sectionRef = useReveal()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState('forward') // for animation direction
  const [phonePrefix, setPhonePrefix] = useState('+34')
  const [prefixDropdownOpen, setPrefixDropdownOpen] = useState(false)
  const [prefixSearch, setPrefixSearch] = useState('')
  const prefixRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    budget: '',
  })

  // Close prefix dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (prefixRef.current && !prefixRef.current.contains(e.target)) {
        setPrefixDropdownOpen(false)
        setPrefixSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredPrefixes = COUNTRY_PREFIXES.filter(
    (p) =>
      p.country.toLowerCase().includes(prefixSearch.toLowerCase()) ||
      p.code.includes(prefixSearch)
  )

  const totalSteps = WIZARD_STEPS.length
  const progress = ((currentStep) / totalSteps) * 100
  const step = WIZARD_STEPS[currentStep]
  const isLastStep = currentStep === totalSteps - 1

  const isCurrentStepValid = () => {
    const value = formData[step.key]
    if (!step.required) return true
    if (step.type === 'tel') {
      // Basic phone validation: at least 9 digits
      const digits = value.replace(/\D/g, '')
      return digits.length >= 9
    }
    return value.trim() !== ''
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleNext = () => {
    if (!isCurrentStepValid()) return
    if (isLastStep) return
    setDirection('forward')
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    if (currentStep === 0) return
    setDirection('back')
    setCurrentStep((prev) => prev - 1)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (isLastStep && isCurrentStepValid()) {
        handleSubmit(e)
      } else {
        handleNext()
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isCurrentStepValid()) return
    setSubmitting(true)

    // Push a dataLayer event for GTM tracking
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'lead_form_submit',
        formType: 'portfolio_request',
        interest: formData.interest,
      })
    }

    // Track Meta lead event
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Portfolio Confidencial 2026',
        content_category: formData.interest,
      })
    }

    // Send to Kommo CRM (prepend prefix to phone)
    const submissionData = {
      ...formData,
      phone: `${phonePrefix} ${formData.phone}`,
    }
    try {
      await fetch('/api/kommo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      })
    } catch (err) {
      console.error('CRM submission error:', err)
    }

    setSubmitting(false)
    setSubmitted(true)
  }

  // Render input based on step type
  const renderStepInput = () => {
    if (step.type === 'select') {
      return (
        <select
          className="form__select"
          id={step.key}
          name={step.key}
          required={step.required}
          value={formData[step.key]}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus
        >
          {step.options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )
    }

    // Phone field with prefix selector
    if (step.key === 'phone') {
      const selectedPrefix = COUNTRY_PREFIXES.find((p) => p.code === phonePrefix)
      return (
        <div className="phone-field" id="phone-field">
          <div className="phone-prefix" ref={prefixRef}>
            <button
              type="button"
              className="phone-prefix__toggle"
              onClick={() => {
                setPrefixDropdownOpen(!prefixDropdownOpen)
                setPrefixSearch('')
              }}
              id="prefix-toggle"
            >
              <span className="phone-prefix__flag">{selectedPrefix?.flag}</span>
              <span className="phone-prefix__code">{phonePrefix}</span>
              <svg className="phone-prefix__arrow" width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
                <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
            {prefixDropdownOpen && (
              <div className="phone-prefix__dropdown" id="prefix-dropdown">
                <div className="phone-prefix__search-wrap">
                  <input
                    type="text"
                    className="phone-prefix__search"
                    placeholder="Buscar país..."
                    value={prefixSearch}
                    onChange={(e) => setPrefixSearch(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="phone-prefix__list">
                  {filteredPrefixes.map((p) => (
                    <button
                      key={p.code}
                      type="button"
                      className={`phone-prefix__option ${p.code === phonePrefix ? 'phone-prefix__option--active' : ''}`}
                      onClick={() => {
                        setPhonePrefix(p.code)
                        setPrefixDropdownOpen(false)
                        setPrefixSearch('')
                      }}
                    >
                      <span className="phone-prefix__option-flag">{p.flag}</span>
                      <span className="phone-prefix__option-country">{p.country}</span>
                      <span className="phone-prefix__option-code">{p.code}</span>
                    </button>
                  ))}
                  {filteredPrefixes.length === 0 && (
                    <div className="phone-prefix__no-results">Sin resultados</div>
                  )}
                </div>
              </div>
            )}
          </div>
          <input
            className="form__input phone-field__input"
            type="tel"
            id={step.key}
            name={step.key}
            placeholder={step.placeholder}
            required={step.required}
            value={formData[step.key]}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      )
    }

    return (
      <input
        className="form__input"
        type={step.type}
        id={step.key}
        name={step.key}
        placeholder={step.placeholder}
        required={step.required}
        value={formData[step.key]}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    )
  }

  return (
    <section className="lead-form section" id="contacto" ref={sectionRef}>
      <div className="container">
        <div className="lead-form__inner">
          <div className="lead-form__content">
            <div className="section-label reveal">Portfolio exclusivo</div>
            <h2 className="section-title reveal reveal-delay-1">
              El mercado que no aparece en los portales.
            </h2>
            <div className="divider reveal reveal-delay-2" />
            <p className="lead-form__text reveal reveal-delay-2">
              Suscríbase para recibir nuestra "Selección Privada 2026". Un dossier confidencial
              con las propiedades más destacadas del trimestre que se gestionan bajo estricta privacidad.
            </p>
            <div className="lead-form__trust reveal reveal-delay-3">
              <div className="lead-form__trust-item">
                <span className="lead-form__trust-icon">{Icons.check}</span>
                <span className="lead-form__trust-text">
                  Acceso anticipado a propiedades antes de su publicación
                </span>
              </div>
              <div className="lead-form__trust-item">
                <span className="lead-form__trust-icon">{Icons.check}</span>
                <span className="lead-form__trust-text">
                  Información de mercado verificada y datos de cierre reales
                </span>
              </div>
              <div className="lead-form__trust-item">
                <span className="lead-form__trust-icon">{Icons.check}</span>
                <span className="lead-form__trust-text">
                  Asesoramiento personalizado sin compromiso
                </span>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            {!submitted ? (
              <form className="form wizard-form" onSubmit={handleSubmit} id="lead-form">
                <h3 className="form__title">Solicitar acceso</h3>
                <p className="form__subtitle">
                  Complete el formulario y recibirá el dossier en las próximas 24h.
                </p>

                {/* ── Progress Bar ── */}
                <div className="wizard-progress" id="wizard-progress">
                  <div className="wizard-progress__bar">
                    <div
                      className="wizard-progress__fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="wizard-progress__label">
                    Paso {currentStep + 1} de {totalSteps}
                  </div>
                </div>

                {/* ── Step Content ── */}
                <div className="wizard-step" key={currentStep}>
                  <div className={`wizard-step__content wizard-step--${direction}`}>
                    <label className="form__label" htmlFor={step.key}>
                      {step.label} {step.required && '*'}
                    </label>
                    {renderStepInput()}

                    {/* Phone verification notice */}
                    {step.key === 'phone' && (
                      <div className="wizard-phone-notice" id="phone-verification-notice">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>Este número de teléfono será verificado por nuestro equipo para confirmar su identidad.</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Navigation Buttons ── */}
                <div className="wizard-nav">
                  {currentStep > 0 && (
                    <button
                      type="button"
                      className="btn btn--outline wizard-nav__back"
                      onClick={handleBack}
                      id="wizard-back-btn"
                    >
                      ← Anterior
                    </button>
                  )}
                  {!isLastStep ? (
                    <button
                      type="button"
                      className={`btn btn--primary wizard-nav__next ${!isCurrentStepValid() ? 'wizard-nav__next--disabled' : ''}`}
                      onClick={handleNext}
                      disabled={!isCurrentStepValid()}
                      id="wizard-next-btn"
                    >
                      Siguiente →
                    </button>
                  ) : (
                    <button
                      className={`btn btn--primary btn--large wizard-nav__submit ${!isCurrentStepValid() ? 'wizard-nav__next--disabled' : ''}`}
                      type="submit"
                      id="form-submit-btn"
                      disabled={submitting || !isCurrentStepValid()}
                    >
                      {submitting ? 'Enviando...' : 'Recibir Portfolio Confidencial'}
                    </button>
                  )}
                </div>

                <p className="form__privacy">
                  Al enviar este formulario, acepta nuestra política de privacidad.
                  Sus datos serán tratados con absoluta confidencialidad.
                </p>
              </form>
            ) : (
              <div className="form form__success" id="form-success">
                <div className="form__success-icon">✦</div>
                <h3 className="form__success-title">Solicitud recibida</h3>
                <p className="form__success-text">
                  Gracias por su interés. Recibirá la Selección Privada 2026 en su correo electrónico
                  en las próximas 24 horas.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            Atria <span>Stays</span>
          </div>
          <div className="footer__links">
            <a href="#" className="footer__link">Privacidad</a>
            <a href="#" className="footer__link">Legal</a>
          </div>
          <div className="footer__legal">
            © {new Date().getFullYear()} Atria Stays. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── WhatsApp Button ───────────────────────────────────────────
function WhatsAppButton() {
  const phoneNumber = '34919934639'
  const message = 'Hola, me interesa conocer las propiedades disponibles en el Barrio de Salamanca.'

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      id="whatsapp-btn"
      aria-label="Contactar por WhatsApp"
    >
      {Icons.whatsapp}
      <span className="whatsapp-btn__tooltip">¿Hablamos?</span>
    </a>
  )
}

// ── Main App ──────────────────────────────────────────────────
export default function App() {
  const scrollToForm = () => {
    const form = document.getElementById('contacto')
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Navigation onCtaClick={scrollToForm} />
      <main>
        <HeroSection onCtaClick={scrollToForm} />
        <ExclusivitySection />
        <ServicesSection />
        <BarrioSection />
        <ProfileSection />
        <LeadFormSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
