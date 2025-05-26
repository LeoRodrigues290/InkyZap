// src/layouts/full/shared/logo/FullLogo.tsx
import React from 'react'
import { Link }        from 'react-router-dom'
import lightLogo       from 'src/assets/images/logos/logo.svg'
import darkLogo        from 'src/assets/images/logos/logo-white.svg'
import { useTheme }    from 'src/contexts/DarkModeContext'

const FullLogo: React.FC = () => {
    const { theme } = useTheme()
    return (
        <Link to="/" className="block">
            <img
                src={theme === 'dark' ? darkLogo : lightLogo}
                alt="CellCom Logo"
                className="w-40 h-auto"
            />
        </Link>
    )
}

export default FullLogo
