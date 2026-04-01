---
name: antd-form-master
description: Specialized in building complex forms with Ant Design Form.
---

# Antd Form rules:
1. **Hook**: Always use `const [form] = Form.useForm()`.
2. **Layout**: Use `layout="vertical"` by default unless requested otherwise.
3. **Validation**:
   - Use the `rules` property of `Form.Item`.
   - Always include common rules: `required: true`, `type: 'email'`, `whitespace: true`.
4. **Submit**: Handle logic in `onFinish`, not native HTML `onSubmit`.
5. **Feedback**: Use Antd `message.success()` or `notification` after submit.

**Example request**: "Create a password change form with: Old password, New password, and Confirm password."