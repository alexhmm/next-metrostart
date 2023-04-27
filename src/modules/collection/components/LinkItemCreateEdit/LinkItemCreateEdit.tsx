import { FC, memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Styles
import styles from './LinkItemCreateEdit.module.scss';

// Types
import { LinkItem, LinkItemPostPatchRequest } from '../../collection.types';
import { ResultState } from '@/src/types/shared.types';

// UI
import Input from '@/src/ui/Input/Input';
import TextButtonOutlined from '@/src/ui/TextButtonOutlined/TextButtonOutlined';

type LinkItemCreateEditProps = {
  item?: LinkItem;
};

const LinkItemCreateEdit: FC<LinkItemCreateEditProps> = (props) => {
  // React hook form validation schema
  const details = z.object({
    name: z.string().min(1, {
      message: 'A name is required',
    }),
    url: z.string().min(1, {
      message: 'An URL is required',
    }),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LinkItemPostPatchRequest>({
    resolver: zodResolver(details),
  });

  // ######### //
  // CALLBACKS //
  // ######### //

  /**
   * Handler to create or edit a link item.
   * @param body LinkItemPostPatchRequest
   */
  const onCreateEditLinkItem = useCallback(
    (body: LinkItemPostPatchRequest) => {
      !props.item && console.log('onCreateLinkItem', body);
      props.item && console.log('onEditLinkItem', body);
    },
    [props]
  );

  return (
    <form
      className={styles['link-item-create-edit']}
      onSubmit={handleSubmit(onCreateEditLinkItem)}
    >
      <Input
        classes={styles['link-item-create-edit-item']}
        label="Name"
        message={errors?.name && errors.name.message?.toString()}
        placeholder="Name of link"
        register={register('name')}
        state={errors?.name && ResultState.Error}
      />
      <Input
        classes={styles['link-item-create-edit-item']}
        label="URL"
        message={errors?.url && errors.url.message?.toString()}
        placeholder="URL to link"
        register={register('url')}
        state={errors?.url && ResultState.Error}
      />
      <div className={styles['link-item-create-edit-actions']}>
        <TextButtonOutlined type="submit">Submit</TextButtonOutlined>
      </div>
    </form>
  );
};

export default memo(LinkItemCreateEdit);