import React from 'react';
import { Form, Input, Button, Card, Checkbox, Layout } from 'antd';

const { Header, Content } = Layout;

const UserInfoForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    alert("Giriş yapıldı!");
    console.log('Form Values:', values);
  };
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  // Telefon numarası doğrulama fonksiyonu
  const validatePhoneNumber = (_, value) => {
    const phoneRegex = /^[1-9][0-9]{9}$/;
    if (!value) {
      return Promise.reject(new Error('Lütfen telefon numaranızı giriniz!'));
    }
    if (!phoneRegex.test(value)) {
      return Promise.reject(new Error('Geçersiz telefon numarası! Numara 10 haneli ve başında 0 olmamalıdır.'));
    }
    return Promise.resolve();
  };

  const validateName = (_, value) => {
    const nameRegex = /^[a-zA-Z]+$/;
    if (!value) {
      return Promise.reject(new Error('Bu alan boş bırakılamaz.'));
    }
    if (!nameRegex.test(value)) {
      return Promise.reject(new Error('Sadece harfler girilebilir.'));
    }
    return Promise.resolve();
  };

  const validateSurname = (_, value) => {
    const surnameRegex = /^[a-zA-Z]+$/;
    if (!value) {
      return Promise.reject(new Error('Bu alan boş bırakılamaz.'));
    }
    if (!surnameRegex.test(value)) {
      return Promise.reject(new Error('Sadece harf girilebilir.'));
    }
    return Promise.resolve();
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: 'white', color: 'white', textAlign: 'center', padding: '0 50px' }}>
        <h1 style={{backgroundColor: '#0017e3', lineHeight: '64px', margin: 0 }}>Üyelik Formu</h1>
      </Header>
      <Content style={{ padding: '50px' }}>
        <Card
          style={{
            maxWidth: 500,
            margin: '60px auto',
            padding: '20px',
            border: '1px solid #d9d9d9',
            borderRadius: '0px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Form
            form={form}
            name="user_info"
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 400, margin: '0 auto' }}
          >
            <Form.Item
              label="Ad"
              name="firstName"
              rules={[{ required: true, message: 'Lütfen adınızı giriniz!' }, { validator: validateName }]}
              hasFeedback
            >
              <Input placeholder="Ad" />
            </Form.Item>

            <Form.Item
              label="Soyad"
              name="lastName"
              rules={[{ required: true, message: 'Lütfen soyadınızı giriniz!' }, { validator: validateSurname }]}
              hasFeedback
            >
              <Input placeholder="Soyad" />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                { type: 'email', message: 'Geçerli bir e-mail adresi giriniz!' },
                { required: true, message: 'Lütfen E-mailinizi giriniz!' },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Telefon"
              rules={[{ required: true, message: '' }, { validator: validatePhoneNumber }]}
              hasFeedback
            >
              <Input placeholder="Telefon" />
            </Form.Item>

            <Form.Item
              label="T.C. Kimlik No"
              name="tc"
              rules={[
                { required: true, message: 'Lütfen T.C. kimlik numaranızı giriniz!' },
                { len: 11, message: 'Tc No 11 haneli olmalıdır.' },
              ]}
              hasFeedback
            >
              <Input placeholder="T.C. Kimlik No" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Parolalar eşleşmiyor!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Checkbox onChange={onChange}>Aydınlatma metninini okudum, onayladım.</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Üye Ol
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default UserInfoForm;
