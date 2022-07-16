import DocumentationSection from './DocumentationSection';
import ResponsiveAppBar from './ResponsiveAppBar';
import Footer from './Footer';

const Layout = ({ children }: any) => {
  return (
    <>
      <ResponsiveAppBar />
      <main>{children}</main>
      <DocumentationSection />
      <Footer />
    </>
  )
}

export default Layout;