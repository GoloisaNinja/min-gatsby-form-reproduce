import * as React from "react"

const styles = {
  honey: {
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -10,
  },
}

const IndexPage = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    subject: "",
    email: "",
    message: "",
  })
  const { name, subject, email, message } = formData
  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }
  const handleSubmission = e => {
    e.preventDefault()
    try {
      fetch("/", {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: encode({ "form-name": "min-contact", ...formData }),
      })
        .then(() => {
          alert("Sent successfully")
          setFormData({
            name: "",
            subject: "",
            email: "",
            message: "",
          })
          return console.log("Success!")
        })
        .catch(error => {
          alert("Something went wrong...")
          console.log(error)
        })
    } catch (error) {
      alert("Did not send message correctly...")
      console.log(error)
    }
  }
  return (
    <div>
      <h2>hello netlify</h2>
      <form
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        id="min-contact"
        name="min-contact"
      >
        <input type="hidden" name="min-contact" value="contact" />
        <label htmlFor="name">name</label>
        <input
          type="text"
          name="name"
          required
          value={name}
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <label style={styles.honey} id="honey" htmlFor="subject">
          subject
        </label>
        <input
          style={styles.honey}
          id="honey"
          type="hidden"
          name="subject"
          value={subject}
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <label htmlFor="message">message</label>
        <input
          type="text"
          required
          name="message"
          value={message}
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <button onClick={e => handleSubmission(e)}>submit</button>
      </form>
    </div>
  )
}

export default IndexPage
