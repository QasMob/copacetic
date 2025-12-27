export default function Layout(props){

    const {children} = props;


    return (
        <> 
            <header>
                <h1 className="text-gradient">VocabsVault</h1>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <small>Created by</small>
                <a href="https://github.com/QasMob" target="_blank">
                <img src="https://avatars.githubusercontent.com/u/102395252?s=400&u=7838d2331c79838f981f5bb529743dda43b5739c&v=4" alt="pfp" />
                <p>@QasMob</p>
                <i className="fa-brands fa-github"></i>
                </a>
            </footer>
        </>
    )
} 