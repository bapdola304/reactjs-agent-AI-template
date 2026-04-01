import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Card, Input, Space, Table, Typography, message } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'
import type { SorterResult } from 'antd/es/table/interface'

import type { PhotoSortField, PhotoSortOrder } from '@/services/photoService'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectPhotosError,
  selectPhotosItems,
  selectPhotosQuery,
  selectPhotosStatus,
  selectPhotosTotal,
  setPhotosPage,
  setPhotosPageSize,
  setPhotosSearch,
  setPhotosSort,
} from '@/store/slices/photosSlice'
import { fetchPhotos } from '@/store/thunks/photosThunks'
import type { Photo } from '@/types/photo'

import styles from './PhotosPage.module.scss'

interface PhotosPageProps {
  _?: never
}

type PhotoTableColumn = 'id' | 'title' | 'albumId'

const SORTER_ORDER_TO_QUERY: Record<
  NonNullable<SorterResult<Photo>['order']>,
  PhotoSortOrder
> = {
  ascend: 'asc',
  descend: 'desc',
}

const QUERY_ORDER_TO_SORTER: Record<PhotoSortOrder, NonNullable<SorterResult<Photo>['order']>> = {
  asc: 'ascend',
  desc: 'descend',
}

export const PhotosPage: FC<PhotosPageProps> = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectPhotosItems)
  const total = useAppSelector(selectPhotosTotal)
  const status = useAppSelector(selectPhotosStatus)
  const error = useAppSelector(selectPhotosError)
  const query = useAppSelector(selectPhotosQuery)

  const [searchText, setSearchText] = useState(query.search)

  useEffect(() => {
    void dispatch(fetchPhotos())
  }, [dispatch, query.page, query.pageSize, query.search, query.sortBy, query.sortOrder])

  useEffect(() => {
    if (status === 'failed' && error) {
      message.error(error)
    }
  }, [status, error])

  const columns: TableColumnsType<Photo> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: true,
        sortOrder: query.sortBy === 'id' ? QUERY_ORDER_TO_SORTER[query.sortOrder] : null,
        width: 88,
      },
      {
        title: 'Thumbnail',
        dataIndex: 'thumbnailUrl',
        key: 'thumbnailUrl',
        width: 92,
        render: (_: string, record) => (
          <img
            src={record.thumbnailUrl}
            alt={record.title}
            className={styles['photos-page__thumb']}
            loading="lazy"
          />
        ),
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        sorter: true,
        sortOrder: query.sortBy === 'title' ? QUERY_ORDER_TO_SORTER[query.sortOrder] : null,
        render: (value: string) => (
          <Typography.Text className={styles['photos-page__title-cell']}>{value}</Typography.Text>
        ),
      },
      {
        title: 'Album',
        dataIndex: 'albumId',
        key: 'albumId',
        sorter: true,
        sortOrder:
          query.sortBy === 'albumId' ? QUERY_ORDER_TO_SORTER[query.sortOrder] : null,
        width: 110,
      },
      {
        title: 'Preview URL',
        dataIndex: 'url',
        key: 'url',
        render: (value: string) => (
          <Typography.Link href={value} target="_blank">
            Open image
          </Typography.Link>
        ),
      },
    ],
    [query.sortBy, query.sortOrder],
  )

  const handleSearch = (value: string) => {
    const normalized = value.trim()
    dispatch(setPhotosSearch(normalized))
  }

  const handleTableChange: TableProps<Photo>['onChange'] = (
    pagination,
    _,
    sorter,
    extra,
  ) => {
    if (extra.action === 'paginate') {
      if (pagination.pageSize && pagination.pageSize !== query.pageSize) {
        dispatch(setPhotosPageSize(pagination.pageSize))
        return
      }

      if (pagination.current && pagination.current !== query.page) {
        dispatch(setPhotosPage(pagination.current))
      }
      return
    }

    if (extra.action === 'sort' && !Array.isArray(sorter) && sorter.field && sorter.order) {
      const field = sorter.field as PhotoTableColumn
      if (field === 'id' || field === 'title' || field === 'albumId') {
        dispatch(
          setPhotosSort({
            sortBy: field as PhotoSortField,
            sortOrder: SORTER_ORDER_TO_QUERY[sorter.order],
          }),
        )
      }
    }
  }

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Typography.Title level={4} className={styles['photos-page__title']}>
          Photos
        </Typography.Title>
        <Input.Search
          allowClear
          placeholder="Search photos by text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          style={{ maxWidth: 420 }}
        />
        <Table<Photo>
          rowKey="id"
          columns={columns}
          dataSource={items}
          loading={status === 'loading'}
          className={styles['photos-page__table']}
          pagination={{
            current: query.page,
            pageSize: query.pageSize,
            total,
            showSizeChanger: true,
          }}
          onChange={handleTableChange}
        />
      </Space>
    </Card>
  )
}

