import Form from './Form';
import mainLogo from '../static/img/random-logo-png-transparent.png';
import logoGit from '../static/img/git.svg';
import logoGoogle from '../static/img/ggl.svg';

export default (() => {
    return (
        <div className="container">
            <div className="block">
                <div className="logo-block" >
                    <img src={mainLogo} className="logo-block__img" alt="" />
                </div>
                <div className="welcome-text-block" >
                    <p className="wtb__header">Welcome</p>
                    <p className="wtb__text">Log in to RanCo to continue to RanCo.</p>
                </div>
                <Form />
                <div className="text-or-block">
                    <p>or</p>
                </div>
                <div className="buttons-auth-block">
                    <button className="buttons-auth-block__btn">
                        <span>
                            <img src={logoGit} alt="" />
                        </span>
                        <span className="bab__text">
                            Continue with GitHub
                        </span>
                    </button>
                    <button className="buttons-auth-block__btn">
                        <span>
                            <img src={logoGoogle} alt="" />
                        </span>
                        <span className="bab__text">
                            Continue with Google
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
});