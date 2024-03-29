import { VFC, useState, ChangeEvent } from 'react';
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Divider,
  Avatar,
  Tooltip,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAsyncGetMyProf,
  fetchAsyncPatchProfileImage,
  fetchAsyncPatchProfileNickname,
  selectUser,
} from '../../slices/authentication/authSlice';
import { debounce } from '../../utils/debounce';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface MemoDialogProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
}

export const AccountProfileEditorDialog: VFC<MemoDialogProps> = (props) => {
  const { isOpen, onClose, ...other } = props;
  const userProfile = useSelector(selectUser);
  const dispatch = useDispatch();

  const [nickName, setNickName] = useState<string | null>(userProfile.profileNickname);
  const [profileNicknameTimerId, setProfileNicknameTimerId] = useState(null);

  const handlerEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput?.click();
  };

  const updateProfileImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const profileImage = {
      profileId: userProfile.profileId,
      profileImage: e.target.files![0],
    };
    await dispatch(fetchAsyncPatchProfileImage(profileImage));
    await dispatch(fetchAsyncGetMyProf());
  };

  const updateProfileNickname = async (e: string) => {
    const profileNickname = {
      profileId: userProfile.profileId,
      profileNickname: e,
    };
    setNickName(e);

    debounce(
      () => {
        dispatch(fetchAsyncPatchProfileNickname(profileNickname));
      },
      profileNicknameTimerId,
      setProfileNicknameTimerId,
      2000,
    )();
  };

  const formik = useFormik({
    initialValues: {
      profileNickname: userProfile.profileNickname,
      submit: null,
    },
    validationSchema: Yup.object({
      profileNickname: Yup.string()
        .max(30, 'ニックネームは30文字以内で入力してください')
        .required('ニックネームを入力してください'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      await updateProfileNickname(values.profileNickname);
    },
  });

  const handleNicknameChange = async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    await formik.handleChange(event);
    await formik.handleSubmit();
  };

  return (
    <Dialog fullWidth maxWidth='sm' onClose={() => onClose(false)} open={isOpen}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          maxHeight: '400px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: '10%',
          }}
        >
          <Box sx={{ mt: 1 }}>
            <Typography align='center' gutterBottom variant='h5'>
              プロフィール編集
            </Typography>
          </Box>

          <Box
            sx={{
              marginLeft: 'auto',
              position: 'absolute',
              right: 0,
            }}
          >
            <IconButton onClick={() => onClose(false)}>
              <CloseIcon fontSize='medium' />
            </IconButton>
          </Box>
        </Box>
        <Divider sx={{ width: '95%' }} />

        <Box
          sx={{
            height: '80%',
            width: '80%',
            my: 3,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box>
            <input
              type='file'
              id='imageInput'
              // accept="image/*"
              accept='.jpe, .jpg, .jpeg, .gif, .png, .bmp, .ico, .tif, .tiff, .psd'
              hidden={true}
              onChange={(e) => updateProfileImage(e)}
            />
          </Box>

          <Box sx={{ mr: 2 }}>
            <Tooltip title='プロフィール画像を変更'>
              <IconButton onClick={handlerEditPicture}>
                <Avatar
                  src={userProfile.profileImage ? userProfile.profileImage.toString() : null}
                  sx={{
                    height: 40,
                    width: 40,
                  }}
                >
                  <AccountCircleIcon fontSize='large' />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>

          <TextField
            error={Boolean(formik.touched.profileNickname && formik.errors.profileNickname)}
            fullWidth
            helperText={formik.touched.profileNickname && formik.errors.profileNickname}
            label='ニックネーム'
            placeholder='nickname'
            name='profileNickname'
            onBlur={formik.handleBlur}
            onChange={(event) => handleNicknameChange(event)}
            type='text'
            value={formik.values.profileNickname}
          />
        </Box>
      </Box>
    </Dialog>
  );
};
