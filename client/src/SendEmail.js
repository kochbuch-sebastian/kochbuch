import axios from 'axios';

const url = '/api/send/';

class SendEmail {
  static async send(address, subject, content) {
    let worked = false;

    try {
      const request = await axios.post(url, {
        address,
        subject,
        content,
      });

      if (request.status >= 200 && request.status < 300) {
        worked = true;
      }

      return worked;
    } catch (err) {
      console.log('err: ');
      console.log(err);
      return err;
    }
  }
}

export default SendEmail;
