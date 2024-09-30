// const Logs = require('./messages_log')
// REER last count: 1

const errors = {
    auth_failed: {
      msg: "کاربر تایید هویت نشد",
      status: 401,
    },
  
    wrong_start_country: {
      msg: "کشور مبدا باید ایران باید",
      status: 400,
    },
    wrong_end_country: {
      msg: "کشور مقصد نمیتواند ایران باشد",
      status: 400,
    },
  
    wrong_birthday: {
      msg: "تاریخ تولد اشتباه است",
      status: 400,
    },
  
    wrong_array_category: {
      msg: "دسته بندی ورودی اشتباه است",
      status: 400,
    },
    wrong_input: {
      msg: "اطلاعات ورودی اشتباه است",
      status: 400,
    },
    change_password_nok: {
      msg: "پسورد تغییر نکرد",
      status: 400,
    },
    wrong_input_code: {
      msg: "کد اعتبارسنجی نامعتبر است",
      status: 400,
    },
    error_subtitle_sub: {
      status: 400,
  
      msg: "طول فیلد زیر عنوان باید بینه ۱ تا ۲۵۵ کاراکتر باشد",
    },
    not_found_cellphone: {
      msg: "شماره موبایل وجود ندارد",
      status: 400,
    },
    not_found_mail: {
      msg: "ایمیل وجود ندارد لطفا ایمیل خود را در حساب کاربری وارد نمایید",
      status: 400,
    },
    file_Size: {
      msg: "حجم فایل ورودی زیاد است",
      status: 400,
    },
    role_not_exists: {
      msg: "نقش تعریف نشده است",
      status: 400,
    },
    role_not_found: {
      msg: "نقش وجود ندارد",
      status: 400,
    },
    amount_notok: {
      msg: "موجودی وارد شده درست نیست",
      status: 400,
    },
    file_not_insure: {
      msg: " فرمت فایل نامعتعبر است",
      status: 400,
    },
    repeated_cellphone: {
      msg: "این شماره موبایل قبلا ثبت نام کرده است",
      status: 400,
    },
    repeated_cellphone_: {
      msg: "این شماره موبایل قبلا ثبت شده است",
      status: 400,
    },
    notExistsOrderId: {
      msg: "fromto_id نادرست است",
      status: 400,
    },
    notExistsId: {
      msg: "id نادرست است",
      status: 400,
    },
    notExistsDetails: {
      msg: "Details نادرست است",
      status: 400,
    },
    get_roles: {
      msg: "یک بار roles را دریافت کنید",
      status: 400,
    },
    repeated_mail: {
      msg: "این پست الکترونیک قبلا ثبت نام کرده است",
      status: 400,
    },
    transaction_failes: {
      msg: "تراکنش ناموفق بود",
      status: 400,
    },
    transaction_token_failes: {
      msg: "توکن تراکنش ناموفق بود",
      status: 400,
    },
    transaction_refnum_failes: {
      msg: "کد تراکنش ناموفق بود",
      status: 400,
    },
    transaction_refnum_exist: {
      msg: "کد تراکنش تکراری بود",
      status: 400,
    },
    user_block: {
      msg: "کاربر بلاک شده است",
      status: 400,
    },
    user_exists: {
      msg: "لطفا چند دقیقه صبر کنید",
      status: 400,
    },
    auth_failed_lastact: {
      msg: "اررور در عملیات آپدیت کاربر",
      status: 400,
    },
    equal_new_old_password: {
      msg: "پسورد فعلی و جدید نباید یکسان باشد",
      status: 400,
    },
    file_name_is_to_long: {
      msg: "اسم فایل باید کمتر از ۱۰۰ حرف باشد",
      status: 400,
    },
  
    errors_block: {
      msg: "عدم دسترسی کاربر",
      status: 403,
    },
  
    internal_error: {
      msg: "دوباره تلاش کنید",
      status: 500,
    },
  
    login_failed: {
      msg: "اطلاعات ورودی اشتباه است.",
      status: 400,
    },
  
    repeated_user: {
      msg: "کاربر تکراری است",
      status: 400,
    },
  
    repeated_code: {
      msg: "کد تخفیخ تکراری است",
      status: 400,
    },
  
    repeated_ink: {
      msg: "لینک تکراری است",
      status: 400,
    },
  
    country_not_exists: {
      status: 400,
  
      msg: "لطفا کشور را مشخص کنید",
    },
    address_not_valid: {
      status: 400,
  
      msg: "ادرس نامعتبر است",
    },
    verification_not_valid: {
      status: 400,
  
      msg: "کد اعتبارسنجی منقضی است",
    },
    IgChecker_is_not_available: {
      status: 500,
  
      msg: "سرویس اینستاگرام در دسترس نمیباشد. لطفا بعدا مجددا تلاش نمایید",
    },
    verify_by_ig_external_url_noth_match: {
      status: 400,
  
      msg: "لینک ثبت شده بر روی اکانت اینستاگرام همسان نمیباشد.",
    },
    ig_account_is_registered_and_verified_by_someone_else: {
      status: 400,
  
      msg: "حساب اینستاگرام قبلا ثبت و اعتبارسنجی شده است!",
    },
    instagram_id_has_no_link: {
      status: 400,
  
      msg: "لینکی برای اکانت اینستاگرام ثبت نشده است",
    },
    not_found: {
      status: 404,
  
      msg: "پیدا نشد!",
    },
    file_notfound: {
      status: 400,
  
      msg: "فایل پیدا نشد!",
    },
  
    wrong_input_username: {
      status: 404,
  
      msg: "نام کاربری موجود نمیباشد",
    },
    platform_not_found: {
      status: 400,
  
      msg: "پلتفرم این کاربر نامشخص است",
    },
    wrong_pass: {
      status: 400,
  
      msg: "پسورد فعلی اشتباه میباشد",
    },
    noFileUploaded: {
      status: 400,
  
      msg: "هیچ فایلی ارسال نشده است!",
    },
  
    error_1: {
      status: 400,
  
      msg: "کد ادمین وارد شده صحیح نیست.",
    },
    error_2: {
      status: 400,
  
      msg: "لطفاً اطلاعات حساب خود را وارد کنید.",
    },
    error_3: {
      status: 400,
  
      msg: "لطفاً شماره‌ی موبایل خود را وارد کنید.",
    },
    error_4: {
      status: 400,
  
      msg: "لطفاً رمز عبور خود را وارد کنید.",
    },
    error_5: {
      status: 400,
  
      msg: "لطفاً آدرس ایمیل خود را وارد کنید.",
    },
    error_6: {
      status: 400,
  
      msg: "لطفاً شماره‌ی موبایل را صحیح وارد کنید.",
    },
    error_7: {
      status: 400,
  
      msg: "لطفاً آدرس ایمیل را صحیح وارد کنید.",
    },
    error_8: {
      status: 400,
  
      msg: "آدرس ایمیل تکراری است.",
    },
    error_9: {
      status: 400,
  
      msg: "لینک مورد نظر در بیو اینستاگرام شما یافت نشد.",
    },
    error_10: {
      status: 400,
  
      msg: "لطفاً حوزه‌ی فعالیت خود را انتخاب کنید.",
    },
    error_11: {
      status: 400,
  
      msg: "فرمت ورودی را چک کنید.",
    },
    error_12: {
      status: 400,
  
      msg: "مسیری  پیدا نشد",
    },
    error_13: {
      status: 400,
  
      msg: "مقدار فیلد «کشور» معتبر نمیباشد.",
    },
    error_13_1: {
      status: 400,
  
      msg: "فیلد «کشور» اجباری میباشد.",
    },
    error_14: {
      status: 400,
  
      msg: "شما میبایست «قوانین و مقررات» را بپذیرید.",
    },
    error_14_1: {
      status: 400,
  
      msg: "فیلد «قوانین و مقررات» اجباری میباشد.",
    },
    error_15: {
      status: 400,
  
      msg: "آدرس ایمیل میبایست حداقل 5 کاراکتر و حداکثر 320 کاراکتر باشد.",
    },
    error_16: {
      status: 400,
  
      msg: "ایمیل اجباری میباشد.",
    },
    error_17: {
      status: 400,
  
      msg: "کد اعتبارسنجی میبایست 4 کاراکتر باشد.",
    },
    error_18: {
      status: 400,
  
      msg: "رمزعبور میبایست حداقل 8 و حداکثر 64 کاراکتر باشد.",
    },
    error_19: {
      status: 400,
  
      msg: "رمزعبور تنها میتواند شامل حروف انگلیسی، نمادها و اعداد باشد و میبایست حداقل یک حرف بزرگ و یک حرف کوچک داشته باشد.",
    },
    error_20: {
      status: 400,
  
      msg: "فیلد tokenId اجباری میباشد.",
    },
    error_21: {
      status: 400,
  
      msg: "فیلد username اجباری میباشد.",
    },
    error_22: {
      status: 400,
  
      msg: "فرمت نام کاربری درج شده صحیح نمیباشد.",
    },
    error_23: {
      status: 400,
  
      msg: "نام کاربری میبایست حداقل 3 کاراکتر و حداکثر 50 کاراکتر باشد.",
    },
    error_24: {
      status: 400,
  
      msg: "فیلد task اجباری میباشد.",
    },
    error_25: {
      status: 400,
  
      msg: "فرمت task درج شده صحیح نمیباشد.",
    },
    error_25_1: {
      status: 400,
  
      msg: "مقدار task درج شده مجاز نمیباشد.",
    },
    error_26: {
      status: 400,
  
      msg: "فیلد task میبایست حداقل 2 کاراکتر و حداکثر 50 کاراکتر باشد.",
    },
    error_27: {
      status: 400,
  
      msg: "فیلد «نام» اجباری میباشد.",
    },
    error_28: {
      status: 400,
  
      msg: "فیلد «نام» میبایست بصورت رشته متنی درج شود.",
    },
    error_29: {
      status: 400,
  
      msg: "فیلد «نام» میبایست حداقل ۲ و حداکثر 50 کاراکتر باشد.",
    },
    error_30: {
      status: 400,
  
      msg: "فیلد «نام» میبایست با حروف فارسی درج گردد.",
    },
    error_31: {
      status: 400,
  
      msg: "فیلد «نام خانوادگی» اجباری میباشد.",
    },
    error_32: {
      status: 400,
  
      msg: "فیلد «نام خانوادگی» میبایست بصورت رشته متنی درج شود.",
    },
    error_33: {
      status: 400,
  
      msg: "فیلد «نام خانوادگی» میبایست حداقل ۲ و حداکثر 50 کاراکتر باشد.",
    },
    error_34: {
      status: 400,
  
      msg: "فیلد «نام خانوادگی» میبایست با حروف فارسی درج گردد.",
    },
    error_35: {
      status: 400,
  
      msg: "هیچ فایلی ارسال نشده است!",
    },
    error_36: {
      msg: "حجم فایل ارسالی بیش از حد مجاز است.",
      status: 400,
    },
    error_37: {
      msg: " فرمت فایل ارسالی نامعتبر است",
      status: 400,
    },
    error_38: {
      status: 400,
  
      msg: "فیلد «usage» اجباری میباشد.",
    },
    error_39: {
      status: 400,
  
      msg: "فیلد «usage» ارسالی معتبر نمیباشد.",
    },
    error_40: {
      status: 400,
  
      msg: "مقدار فیلد «usage» مجاز نمیباشد.",
    },
    error_41: {
      status: 400,
  
      msg: "فیلد «files» اجباری میباشد.",
    },
    error_42: {
      status: 400,
  
      msg: "فرمت فیلد «files» صحیح نمیباشد.",
    },
    error_43: {
      status: 400,
  
      msg: "مقدار «لینک» (آی دی اینستاگرام) هنگامیکه درخواست مرتبط با «صفحه فرود» است، اجباری میباشد.",
    },
    error_44: {
      status: 400,
  
      msg: "فیلد «لینک» میبایست بصورت رشته متنی درج شود.",
    },
    error_45: {
      status: 400,
  
      msg: "فیلد «لینک» میبایست حداقل 3 و حداکثر 50 کاراکتر باشد.",
    },
    error_46: {
      status: 400,
  
      msg: "آدرس درخواستی معتبر نمیباشد.",
    },
    error_47: {
      status: 400,
  
      msg: "فیلد «category» اجباری میباشد.",
    },
  
    error_48: {
      status: 400,
  
      msg: "شما میبایست حداقل یک و حداکثر سه مجموعه را انتخاب کنید.",
    },
    error_49: {
      status: 400,
  
      msg: "مجموعه انتخابی مجاز نمیباشد.",
    },
    error_50: {
      status: 400,
  
      msg: "فیلد «تکرار رمز عبور» اجباری میباشد.",
    },
    error_51: {
      status: 400,
  
      msg: "فیلدهای «رمزعبور» و «تکرار رمز عبور» یکسان نمیباشد.",
    },
    error_52: {
      status: 400,
  
      msg: "فیلد «نقش» اجباری میباشد.",
    },
    error_53: {
      status: 400,
  
      msg: "شما میبایست یک نقش را انتخاب کنید.",
    },
    wrong_input_1: {
      status: 400,
  
      msg: "اطلاعات ورودی اشتباه است",
    },
    token_expired: {
      status: 400,
  
      msg: "   لینک اعتبارسنجی شما منقضی شده است",
    },
    wrong_input_visa: {
      status: 400,
  
      msg: "اطلاعات ورودی برای ویزا اشتباه است",
    },
    wrong_input_visa_1: {
      status: 400,
  
      msg: "ویزای مورد نظر برای این کشور معتبر نیست ",
    },
    error_60: {
      status: 400,
  
      msg: "فیلد عنوان عکس اجباری میباشد.",
    },
    error_61: {
      status: 400,
  
      msg: "فیلد verified_by اجباری میباشد.",
    },
    error_62: {
      status: 400,
  
      msg: "طول فیلد عنوان باید بینه ۱ تا ۲۵۵ کاراکتر باشد",
    },
    error_63: {
      status: 400,
  
      msg: "طول فیلد زیر عنوان باید بینه ۱ تا ۲۵۵ کاراکتر باشد",
    },
    error_64: {
      status: 400,
  
      msg: "طول فیلد پسورد جدید باید بینه 8 تا 64 کاراکتر باشد",
    },
    error_65: {
      status: 400,
  
      msg: "فرمت پسورد جدید نامعتبر است",
    },
    error_66: {
      status: 400,
  
      msg: "پسورد جدید وجود ندارد است",
    },
    error_67: {
      status: 400,
  
      msg: "طول فیلد پسورد فعلی باید بینه 8 تا 64 کاراکتر باشد",
    },
    error_68: {
      status: 400,
  
      msg: "فرمت پسورد فعلی نامعتبر است",
    },
    error_69: {
      status: 400,
  
      msg: "پسورد فعلی وجود ندارد است",
    },
    error_70: {
      status: 400,
  
      msg: "آیدی باید یک عدد باشد.",
    },
  
    error_101: {
      status: 400,
  
      msg: "فرمت داده‌های ارسالی اشتباه است.",
    },
    error_102: {
      status: 400,
  
      msg: "طول آیدی باید بیشتر از صفر باشد",
    },
    error_103: {
      status: 400,
  
      msg: "طول رشته status ارسالی باید بینه ۳ تا ۲۹ حرف باشد",
    },
    error_104: {
      status: 400,
  
      msg: "حروف رشته ارسالی نامعتبر میباشند",
    },
  
    error_105: {
      status: 400,
  
      msg: "order ارسالی نامعتبر میباشند",
    },
    error_106: {
      status: 400,
  
      msg: "حروف typeOrder ارسالی نامعتبر میباشند",
    },
  
    Comment_error: {
      status: 400,
  
      msg: "comment ارسالی نامعتبر میباشند",
    },
  
    price_error: {
      status: 400,
  
      msg: "کاراکتر 1-10  قیمت های ارسالی نامعتبر میباشند",
    },
  
    not_complet_query: {
      status: 400,
  
      msg: "فرمت زمان ارسالی نادرست است",
    },
  
    price_error_number: {
      status: 400,
  
      msg: "قیمت های ارسالی نامعتبر میباشند شامل عدد و .باید باشد",
    },
  
    error_107: {
      status: 400,
  
      msg: "فیلد status فقط شامل done pending reject confirm میباشد ",
    },
  
    error_108: {
      status: 400,
  
      msg: "شماره شبا اشتباه است ",
    },
  
    error_109: {
      status: 400,
  
      msg: "جنسیت شامل اعداد ۰ ۱ ۲ میباشد",
    },
  };
  
  const suc_messages = {
    register_step_one: {
      msg: "عملیات با موفقیت انجام شد",
      status: 200,
      time: 120,
      is_success: true,
    },
  
    register_steptwo: {
      msg: "کد ارسالی درست می باشد",
      status: 200,
      is_success: true,
    },
  
    forget_stepthere_done: {
      msg: "فراموشی رمز عبور کامل شد.",
      status: 200,
      is_success: true,
    },
    login_done: {
      msg: "اطلاعات صحیح میباشد",
      status: 200,
      is_success: true,
    },
  
    link_not_exists: {
      msg: "لینک قابل استفاده است",
      status: 200,
      is_success: true,
    },
  
    change_password_ok: {
      msg: "پسورد با موفقیت تغییر کرد",
      status: 200,
      is_success: true,
    },
    ok_delete: {
      msg: "عکس پروفایل کاربر پاک شد",
      status: 200,
      is_success: true,
    },
    ready_get_code: {
      msg: "کد ارسال شد",
      status: 200,
      is_success: true,
    },
    link_created: {
      msg: "لینک با موفقیت ساخته شد",
      status: 200,
      is_success: true,
    },
    redis_delete: {
      msg: "دیتا های موجود در ردیس پاک شدن ",
      status: 200,
      is_success: true,
    },
    success_email: {
      msg: "ایمیل با موفقیت ارسال شد",
      status: 200,
      is_success: true,
    },
    ready_register: {
      msg: "کد ارسال شد",
      status: 200,
      is_success: true,
    },
    success: {
      msg: "عملیات اعتبارسنجی با موفقیت انجام شد.",
      status: 200,
      is_success: true,
    },
    token: {
      status: 200,
      is_success: true,
    },
    logout: {
      msg: "خروج انجام شد.",
      status: 200,
      is_success: true,
    },
    success_1: {
      msg: "فایل(ها) با موفقیت ذخیره شد.",
      status: 200,
      is_success: true,
    },
  };
  
  const not_now_messages = {
    not_find_any_status: {
      msg: "پاسخ نا مشخص",
      status: 411,
    },
  };
  
  const msgList = {
    error: errors,
    success: suc_messages,
  };
  
  res_data = (data) => {
    let obj = {},
      keyss = Object.keys(data);
    Object.keys(data).map((item) => {
      if (item != "status") obj[item] = data[item];
    });
  
    return obj;
  };
  message = (type, msg, req, res, token = null) => {
    try {
      if (type === "error") {
        console.log("error  ", errors[msg]);
        return res.status(errors[msg].status).json(res_data(errors[msg]));
      } else if (type === "success") {
        return res
          .status(suc_messages[msg].status)
          .json(res_data(suc_messages[msg]));
      } else if (type === "custom_message") {
        return res.status(msg.status).json(res_data(msg));
      } else {
        return res
          .status(411)
          .json(res_data(not_now_messages["not_find_any_status"]));
      }
    } catch (err) {
      return res
        .status(500)
        .json({ msg: "پیام تعریف نشده است", is_success: false });
    }
  };
  
  exports.message = message;
  exports.msgList = msgList;
  