/* eslint-disable no-else-return */
// @ts-nocheck
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import { Field, FieldArray, Form, Formik } from "formik"
import { ReactSVG } from "react-svg"
import sanitizeHtml from "sanitize-html"
import Strapi from "strapi-sdk-js"
import * as Yup from "yup"

import { CommonPill } from "@/components/Common/CommonStyles"

import { EditProfileFormStyles } from "./EditProfileFormStyles"

interface FormValues {
  artist: string
  bio: string
  website: string
  spotify: string
  youtube: string
  facebook: string
  twitter: string
  instagram: string
  genre: string
  members: {
    name: string
    image: string
  }[]
}

const initialValues = {
  artist: "",
  bio: "",
  website: "",
  spotify: "",
  youtube: "",
  facebook: "",
  twitter: "",
  instagram: "",
  genre: "",
  members: [{ name: "", image: "" }],
}

const EditProfileForm = () => {
  const { data: user } = useSession()
  const [artists, setArtists] = useState([])
  const [memberImages, setMemberImages] = useState({})

  const handleFileChange = (e: any, index: number) => {
    const file = e.target.files[0]
    setMemberImages((prevState) => ({ ...prevState, [index]: file }))
  }

  // Fetch the data in the useEffect hook
  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          const { data } = await axios.get(
            // @ts-ignore
            "/api/artists/managed?user=" + user.id
          )
          const artists = data
          setArtists(artists)
        }
      } catch (err: any) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  async function setArtistData(artistId: any, setFieldValue: any) {
    if (artistId) {
      const artistData = artists.find((a: any) => a.id == artistId)
      if (artistData) {
        const artist = artistData
        setFieldValue(
          "bio",
          sanitizeHtml(artist.bio, {
            allowedTags: [],
          })
        )
        setFieldValue("website", artist.website)
        setFieldValue("spotify", artist.spotify)
        setFieldValue("youtube", artist.youtube)
        setFieldValue("facebook", artist.facebook)
        setFieldValue("twitter", artist.twitter)
        setFieldValue("instagram", artist.instagram)
        setFieldValue("genre", artist.genre)

        const members = artist.members ? artist.members : []

        members.forEach((member: any) => {
          member.existing_image = member.nft_default_image
            ? member.nft_default_image?.formats.thumbnail.url
            : false
        })
        setFieldValue("members", members)
      }
    }
  }

  const valuesSchema = Yup.object().shape({
    artist: Yup.string().required("Artist is required"),
    bio: Yup.string().required("Bio is required"),
    website: Yup.string()
      .url("Enter a valid URL")
      .required("Website is required"),
    spotify: Yup.string()
      .url("Enter a valid URL")
      .required("Spotify link is required"),
    youtube: Yup.string()
      .url("Enter a valid URL")
      .required("Youtube channel is required"),
    facebook: Yup.string()
      .url("Enter a valid URL")
      .required("Facebook link is required"),
    twitter: Yup.string()
      .url("Enter a valid URL")
      .required("Twitter link is required"),
    instagram: Yup.string()
      .url("Enter a valid URL")
      .required("Instagram link is required"),
    genre: Yup.string().required("Genre is required"),
    members: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Name is required"),
      })
    ),
  })

  async function uploadImageToStrapi(file: File) {
    const formData = new FormData()
    formData.append("files", file)
    const apiURL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"
    const token = process.env.NEXT_PUBLIC_API_TOKEN_LIMITED

    const strapi = new Strapi({
      url: apiURL,
      prefix: "/api",
      store: {
        key: "strapi_jwt",
        useLocalStorage: false,
        cookieOptions: { path: "/" },
      },
      axiosOptions: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })

    const response = await strapi.axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data[0].id
  }

  async function updateArtist(values: any) {
    const response = await axios.patch("/api/artists/update", {
      artist: values.artist,
      bio: values.bio,
      website: values.website,
      spotify: values.spotify,
      youtube: values.youtube,
      facebook: values.facebook,
      twitter: values.twitter,
      instagram: values.instagram,
      genre: values.genre,
      members: values.members,
    })
    return response
  }

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: any
  ) => {
    setSubmitting(true)

    // Upload images to Strapi and store their IDs
    const uploadedImageIds = await Promise.all(
      Object.entries(memberImages).map(async ([index, file]) => {
        const imageId = await uploadImageToStrapi(file)
        return { index: parseInt(index), imageId }
      })
    )
    // Update members array with the image IDs
    const updatedMembers = values.members.map((member: any, index: number) => {
      const uploadedImage = uploadedImageIds.find(({ index: i }) => i === index)
      if (uploadedImage) {
        return { ...member, nft_default_image: uploadedImage.imageId }
      } else {
        return {
          ...member,
          nft_default_image: member?.nft_default_image?.data?.id || null,
        }
      }
    })

    updateArtist({ ...values, members: updatedMembers })
      .then((response) => {
        // resetForm()
      })
      .catch((error) => {
        // Show an error message
        alert(
          "An error occurred adding the event. Please contact us if this is a repeated issue."
        )
        console.log(error)
      })
      .finally(() => {
        setSubmitting(false)
        window.location.reload()
      })
  }

  return (
    <EditProfileFormStyles className="content">
      <div>
        <div className="form-container">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={valuesSchema}
          >
            {({ isSubmitting, errors, touched, values, setFieldValue }) => (
              <div className="in-popup">
                {!isSubmitting ? (
                  <>
                    <Form className="cols-2">
                      <label className="full">
                        <span>Pick an artist to edit for</span>
                        {errors.artist && touched.artist ? (
                          <div className="alert">{errors.artist}</div>
                        ) : null}

                        <Field
                          name="artist"
                          as="select"
                          onChange={(e: any) => {
                            setFieldValue("artist", e.target.value)
                            setArtistData(e.target.value, setFieldValue)
                          }}
                        >
                          <option value="">- Select an artist -</option>
                          {artists.map((item: any) => {
                            return (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            )
                          })}
                        </Field>
                      </label>
                      {values.artist ? (
                        <>
                          <label>
                            <span>Bio</span>
                            {errors.bio && touched.bio ? (
                              <div className="alert">{errors.bio}</div>
                            ) : null}
                            <Field
                              name="bio"
                              as="textarea"
                              placeholder=""
                              rows={4}
                            />
                          </label>
                          <label>
                            <span>Genre</span>
                            {errors.genre && touched.genre ? (
                              <div className="alert">{errors.genre}</div>
                            ) : null}
                            <Field name="genre" type="text" placeholder="" />
                          </label>
                          <label className="third">
                            <span>Website</span>
                            {errors.website && touched.website ? (
                              <div className="alert">{errors.website}</div>
                            ) : null}
                            <Field name="website" type="text" placeholder="" />
                          </label>
                          <label className="third">
                            <span>Spotify Link</span>
                            {errors.spotify && touched.spotify ? (
                              <div className="alert">{errors.spotify}</div>
                            ) : null}
                            <Field name="spotify" type="text" placeholder="" />
                          </label>
                          <label className="third">
                            <span>Youtube Channel</span>
                            {errors.youtube && touched.youtube ? (
                              <div className="alert">{errors.youtube}</div>
                            ) : null}
                            <Field name="youtube" type="text" placeholder="" />
                          </label>
                          <label className="third">
                            <span>Facebook Link</span>
                            {errors.facebook && touched.facebook ? (
                              <div className="alert">{errors.facebook}</div>
                            ) : null}
                            <Field name="facebook" type="text" placeholder="" />
                          </label>
                          <label className="third">
                            <span>Twitter Link</span>
                            {errors.twitter && touched.twitter ? (
                              <div className="alert">{errors.twitter}</div>
                            ) : null}
                            <Field name="twitter" type="text" placeholder="" />
                          </label>
                          <label className="third">
                            <span>Instagram Link</span>
                            {errors.instagram && touched.instagram ? (
                              <div className="alert">{errors.instagram}</div>
                            ) : null}
                            <Field
                              name="instagram"
                              type="text"
                              placeholder=""
                            />
                          </label>
                          <label className="full members-title">
                            <span>Members</span>
                          </label>
                          <div className="members-container">
                            <FieldArray
                              name="members"
                              render={(arrayHelpers) => (
                                <div>
                                  {values.members.map((member: any, index) => (
                                    <div key={index} className="members-item">
                                      <label>
                                        {errors.members &&
                                        errors.members[index] &&
                                        touched.members &&
                                        touched.members[index] &&
                                        errors.members[index].name ? (
                                          <div className="alert">
                                            {errors.members[index].name}
                                          </div>
                                        ) : null}
                                        <Field
                                          name={`members.${index}.name`}
                                          type="text"
                                          placeholder="Member name"
                                        />
                                      </label>
                                      <label className="image-field">
                                        {errors.members &&
                                        errors.members[index] &&
                                        touched.members &&
                                        touched.members[index] &&
                                        errors.members[index].image ? (
                                          <div className="alert">
                                            {errors.members[index].image}
                                          </div>
                                        ) : null}
                                        <input
                                          type="file"
                                          name={`members.${index}.image`}
                                          onChange={(e) =>
                                            handleFileChange(e, index)
                                          }
                                        />
                                        {values.members[index]
                                          .existing_image && (
                                          <img
                                            src={
                                              values.members[index]
                                                .existing_image
                                            }
                                            alt="member image"
                                          />
                                        )}
                                      </label>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      >
                                        Remove Member
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.push({ name: "", image: "" })
                                    }
                                  >
                                    Add Member
                                  </button>
                                </div>
                              )}
                            />
                          </div>
                          <div className="buttons">
                            <button type="submit">
                              <CommonPill className="clickable">
                                Confirm
                              </CommonPill>
                            </button>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </Form>
                  </>
                ) : (
                  <div className="success">
                    <ReactSVG src="/assets/icons/check-circle.svg" />
                    Event created successfully
                  </div>
                )}
              </div>
            )}
          </Formik>
        </div>
      </div>
    </EditProfileFormStyles>
  )
}

export default EditProfileForm
