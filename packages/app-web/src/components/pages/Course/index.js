import React from 'react'

const styles = {
    infoBar: {
        border: '1px solid rgba(0,0,0, .1)',
        borderRadius: '4px',
        padding:'14px 16px',
        display: 'flex',
        alignItems: 'stretch'
    },
    infoBarItem: {
        textAlign: 'center',
        flex: '1',
    }
}

const Course = ({ course }) => (
    <div>
        <div style={styles.infoBar}>
            <div style={styles.infoBarItem}><img style={{width: '18px', height: '18px', marginRight: '5px', opacity: '0.4' }} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAy%0D%0ANCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBjbGFzcz0iaGVyb2ljb24tdWkiIGQ9Ik0x%0D%0AMSAyMHYtMi4wOGE2IDYgMCAwIDEtNC4yNC0zQTQuMDIgNC4wMiAwIDAgMSAyIDExVjZjMC0xLjEu%0D%0AOS0yIDItMmgyYzAtMS4xLjktMiAyLTJoOGEyIDIgMCAwIDEgMiAyaDJhMiAyIDAgMCAxIDIgMnY1%0D%0AYTQgNCAwIDAgMS00Ljc2IDMuOTNBNiA2IDAgMCAxIDEzIDE3LjkyVjIwaDRhMSAxIDAgMCAxIDAg%0D%0AMkg3YTEgMSAwIDAgMSAwLTJoNHptNi45Mi03SDE4YTIgMiAwIDAgMCAyLTJWNmgtMnY2YzAgLjM0%0D%0ALS4wMy42Ny0uMDggMXpNNi4wOCAxM0E2LjA0IDYuMDQgMCAwIDEgNiAxMlY2SDR2NWEyIDIgMCAw%0D%0AIDAgMi4wOCAyek04IDR2OGE0IDQgMCAxIDAgOCAwVjRIOHoiLz48L3N2Zz4=" alt=""/><strong>3</strong> ects</div>
            <div style={styles.infoBarItem}><img style={{width: '18px', height: '18px', marginRight: '5px', opacity: '0.4' }} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAy%0D%0ANCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBjbGFzcz0iaGVyb2ljb24tdWkiIGQ9Ik05%0D%0AIDEyQTUgNSAwIDEgMSA5IDJhNSA1IDAgMCAxIDAgMTB6bTAtMmEzIDMgMCAxIDAgMC02IDMgMyAw%0D%0AIDAgMCAwIDZ6bTcgMTFhMSAxIDAgMCAxLTIgMHYtMmEzIDMgMCAwIDAtMy0zSDdhMyAzIDAgMCAw%0D%0ALTMgM3YyYTEgMSAwIDAgMS0yIDB2LTJhNSA1IDAgMCAxIDUtNWg0YTUgNSAwIDAgMSA1IDV2Mnpt%0D%0AMS01YTEgMSAwIDAgMSAwLTIgNSA1IDAgMCAxIDUgNXYyYTEgMSAwIDAgMS0yIDB2LTJhMyAzIDAg%0D%0AMCAwLTMtM3ptLTItNGExIDEgMCAwIDEgMC0yIDMgMyAwIDAgMCAwLTYgMSAxIDAgMCAxIDAtMiA1%0D%0AIDUgMCAwIDEgMCAxMHoiLz48L3N2Zz4=" alt=""/><strong>26</strong> students</div>
            <div style={styles.infoBarItem}><img style={{width: '18px', height: '18px', marginRight: '5px', opacity: '0.4' }} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAy%0D%0ANCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBjbGFzcz0iaGVyb2ljb24tdWkiIGQ9Ik0x%0D%0AMiAyMmExMCAxMCAwIDEgMSAwLTIwIDEwIDEwIDAgMCAxIDAgMjB6bTAtMmE4IDggMCAxIDAgMC0x%0D%0ANiA4IDggMCAwIDAgMCAxNnptMS04LjQxbDIuNTQgMi41M2ExIDEgMCAwIDEtMS40MiAxLjQyTDEx%0D%0ALjMgMTIuN0ExIDEgMCAwIDEgMTEgMTJWOGExIDEgMCAwIDEgMiAwdjMuNTl6Ii8+PC9zdmc+" /><strong>10</strong> weeks</div>
        </div>
        <h1>{course.name || ''}</h1>
        {/* <iframe src="http://docs.google.com/gview?url=https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx&embedded=true" style={{width: '100%', height: '600px'}} frameBorder="0"></iframe> */}
    </div>
)

Course.defaultProps = {
    course: {
        name: 'IPSENH'
    }
}

export default Course
