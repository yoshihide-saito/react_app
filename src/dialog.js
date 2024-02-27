import React, { Component } from "react"
import './App.css'
import fetchJsonp from 'fetch-jsonp'

export default class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      ken: '',
      ku: '',
      machi: '',
      kenKana: '',
      kuKana: '',
      machiKana: '',
      errorMessage: '',
    }
  }

  onInput = (e) => {
    this.setState({
      address: e.target.value
    })
  }

  searchAddress = async () => {
    const { address } = this.state
    const requestURL = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${address}`

    fetchJsonp(requestURL)
      .then(response => response.json())
      .then(data => {
        if(data.results === null) {
          this.setState({
            errorMessage: '不正な郵便番号です'
          })
          return
        }
        const {
          address1,
          address2,
          address3,
          kana1,
          kana2,
          kana3
        } = data.results[0]
        this.setState({
          ken: address1,
          ku: address2,
          machi: address3,
          kenKana: kana1,
          kuKana: kana2,
          machiKana: kana3,
          errorMessage: '',
        })
      })
  }

  render() {
    const { ken, ku, machi, kenKana, kuKana, machiKana, errorMessage } = this.state
    const targetOpen = () => {
      document.getElementById('dialog_ex1').showModal()
    }
    const targetClose = () => {
      document.getElementById('dialog_ex1').close()
    }

    return(
      <div className="App">
        <button type="button" onClick={ targetOpen }>
          ダイアログを表示
        </button>
        <dialog id="dialog_ex1" aria-labelledby="dialog_ex1_h">
          <h3 id="dialog_ex1_h">
            郵便番号データを検索します。
            <br />
            xxx-xxxxの形式で郵便番号を入力してください。
          </h3>
          <input type='text' onInput={ this.onInput } />
          <button onClick={ this.searchAddress }>検索</button>
          <p>検索結果</p>
          <div style={{ display: !errorMessage ? "block" : "none" }}>
            <p>{ ken } { kenKana}</p>
            <p>{ ku } { kuKana}</p>
            <p>{ machi } { machiKana}</p>
          </div>
          <p style={{ display: errorMessage ? "block" : "none" }}>
            { errorMessage }
          </p>
          <button type="button" onClick={ targetClose }>
            閉じる
          </button>
        </dialog>
      </div>
    )
  }
}